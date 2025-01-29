import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ChatCompletionResponse, HealthInfluencer, HealthInfluencerVerified, Journal, Message } from "../interfaces/Research";
import axios from "axios";

const generateId = () => crypto.randomUUID();

const transformClaims = (data : HealthInfluencer) : HealthInfluencerVerified => {
  return {
    ...data,
    claims: data.claims.map((claim) => ({
      id: generateId(),
      text: claim,
      trustScore: 0,
      status: 'Debunked',
      category: "none",
      verifyLinkReference: ''
    })),
  };
};

const saveInfo = async (data: HealthInfluencerVerified) => {
  // TODO find if dr name is not already saved to avoid saving duplicates
  try {
    const docRef = await addDoc(collection(db, "health-influencers"), data);
    console.log("Data saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error saving tweet: ", e);
  }
};

// Promise<HealthInfluencerVerified>
const verifyClaims = async (
  research: HealthInfluencerVerified,
  journals: Journal[]
) : Promise<ChatCompletionResponse>  => {
  try {

    const processJournals = (journals: Journal[]): string => {
      const selectedJournals = journals
        .filter(journal => journal.selected)
        .map(journal => journal.name);
    
      if (selectedJournals.length === 0) {
        return "No specific scientific journals were selected.";
      }
    
      const formattedList =
        selectedJournals.length > 1
          ? selectedJournals.slice(0, -1).join(", ") + " and " + selectedJournals.slice(-1)
          : selectedJournals[0];
    
      return `The following scientific journals will be used as references: ${formattedList}.`;
    };

    // Messages for the AI
    const messages = [
      {
        role: "system",
        content:
          "You are a fact-checking AI that strictly returns JSON data. Do not include any explanations, headers, or markdown formatting. Respond only with a valid JSON object.",
      },
      {
        role: "user",
        content: `Evaluate the following health claims made by the influencer "${research.name}". Compare them with trusted sources, focusing on accuracy and scientific validity.  
        
        **Influencer Details:**  
        - Name: ${research.name}  
        - Bio: ${research.biography}  
        - Followers: ${research.qFollowers}  
        - Yearly Revenue: $${research.yearlyRevenue}  
        
        **Claims to Evaluate:**  
        ${research.claims.map((claim, index) => `- ${index + 1}. ${JSON.stringify(claim)}`).join("\n")}

        **Instructions:**  
        - Search for evidence in the selected journals.  
        - Return a JSON object with the following structure:
        - As claim status use only "Verified", "Debunked" or "Questionable"
        
        **Strict JSON Format (No explanations, markdown, or additional text):**  
        \`\`\`json
        {
          "id": "generated_id",
          "name": "${research.name}",
          "biography": "${research.biography}",
          "qFollowers": ${research.qFollowers},
          "yearlyRevenue": ${research.yearlyRevenue},
          "claims": [
            { 
              "id": "jfkdañ-12ñklfda-23ñk",
              "text": "Claim 1", 
              "trustScore": 85, 
              "status": "Verified",
              "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pubmed/XXXXX",
              "category": "Nature"
            },
            { 
              "id": "jfkdañ-12ñklfda-23ñk",
              "text": "Claim 2", 
              "trustScore": 75, 
              "status": "Debunked",
              "verifyLinkReference": "https://www.nature.com/articles/YYYYY",
              "category": "Performance"
            },
            { 
              "id": "jfkdañ-12ñklfda-23ñk",
              "text": "Claim 3", 
              "trustScore": 40, 
              "status": "Questionable",
              "verifyLinkReference": "https://www.sciencedirect.com/science/article/ZZZZZ",
              "category": "Sleep"
            }
          ]
        }
        \`\`\`
        
        ${processJournals(journals)}
        `,
      },
    ];

    // API Request
    const response = await axios.post<ChatCompletionResponse>(
      import.meta.env.VITE_BASE_URL,
      {
        model: "sonar-pro",
        messages,
        format: "json", // Ensures AI responds with pure JSON
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY_AI}`,
        },
      }
    );

    // const response = { data: {}}

    // Validate the response is valid JSON before storing it
    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid response format: Expected a JSON object.");
    }

    console.log("Messages sent:", messages);
    // console.log("Response received:", response.data);
    console.log('response.data', response.data)
    return response.data;
    // return messages
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error("Error fetching chat completion:", error.response || error.message);
        throw error.response?.data || error.message;
    } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
    }
  }
};


export const fetchDataFromIA = async (
  messages: Message[]
): Promise<HealthInfluencerVerified> => {
  try {
    // const response = await axios.post<ChatCompletionResponse>(
    //   BASE_URL,
    //   {
    //     model: "sonar-pro",
    //     messages,
    //   },
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${API_KEY}`,
    //     },
    //   }
    // );

    const response : { data: HealthInfluencer } = {
      data: { 
        id: generateId(), 
        name: "Dr. Rhonda Patrick", 
        biography: "Dr. Rhonda Patrick is a scientist and health educator with a Ph.D. in Biomedical Science. She is the founder of FoundMyFitness, where she shares evidence-based insights on nutrition, aging, and disease prevention. Dr. Patrick conducts research on micronutrients, metabolism, and longevity, and is an associate scientist at the Fatty Acid Research Institute.",  claims: [
          "Fasting will increase testosterone levels",
          "Longer fasting will increase growth hormone levels",
          "Exercise intensity as if being chased with a syringe of poison can boost performance",
          "Viewing sunlight within 30-60 minutes of waking enhances cortisol release"
        ],
        qFollowers: 6100000,
        yearlyRevenue: 5000000
      }
    }

    const resClaimsProcessed = transformClaims(response.data)

    console.log('messages', messages)

    const transformedClaims = transformClaims(response.data);
    console.log('transformedClaims', transformedClaims)

    // console.log('response:', response.data)
    return resClaimsProcessed;
    // return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error("Error fetching chat completion:", error.response || error.message);
        throw error.response?.data || error.message;
    } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
    }
  }
};

export const executeResearchAndVerify = async (messages: Message[], journals: Journal[]) => {
  try {
    const researchFromIA = await fetchDataFromIA(messages);
    if (!researchFromIA) throw new Error("Research data is undefined or invalid.");
    console.log('journals', journals);
    console.log('researchFromIA', researchFromIA);
    
    const verifyResearch = await verifyClaims(researchFromIA, journals);
    if (!verifyResearch) throw new Error("Failed to verify claims.");

    const data = "{\n  \"id\": \"rhonda_patrick_001\",\n  \"name\": \"Dr. Rhonda Patrick\",\n  \"biography\": \"Dr. Rhonda Patrick is a scientist and health educator with a Ph.D. in Biomedical Science. She is the founder of FoundMyFitness, where she shares evidence-based insights on nutrition, aging, and disease prevention. Dr. Patrick conducts research on micronutrients, metabolism, and longevity, and is an associate scientist at the Fatty Acid Research Institute.\",\n  \"qFollowers\": 6100000,\n  \"yearlyRevenue\": 5000000,\n  \"claims\": [\n    {\n      \"id\": \"a7516d9c-6953-4cae-a273-8cb10784f434\",\n      \"text\": \"Fasting will increase testosterone levels\",\n      \"trustScore\": 20,\n      \"status\": \"Debunked\",\n      \"verifyLinkReference\": \"https://pubmed.ncbi.nlm.nih.gov/35684143/\",\n      \"category\": \"Hormones\"\n    },\n    {\n      \"id\": \"5414fa9f-0427-42ed-94f1-a2c8e9b75bbe\",\n      \"text\": \"Longer fasting will increase growth hormone levels\",\n      \"trustScore\": 60,\n      \"status\": \"Questionable\",\n      \"verifyLinkReference\": \"https://pubmed.ncbi.nlm.nih.gov/35684143/\",\n      \"category\": \"Hormones\"\n    },\n    {\n      \"id\": \"bc5e0f57-c4cc-46a6-858a-63abbd991280\",\n      \"text\": \"Exercise intensity as if being chased with a syringe of poison can boost performance\",\n      \"trustScore\": 30,\n      \"status\": \"Questionable\",\n      \"verifyLinkReference\": \"https://pubmed.ncbi.nlm.nih.gov/35684143/\",\n      \"category\": \"Exercise\"\n    },\n    {\n      \"id\": \"4ed71bb7-e53e-4118-bd6c-a116f09731a4\",\n      \"text\": \"Viewing sunlight within 30-60 minutes of waking enhances cortisol release\",\n      \"trustScore\": 70,\n      \"status\": \"Questionable\",\n      \"verifyLinkReference\": \"https://pubmed.ncbi.nlm.nih.gov/35684143/\",\n      \"category\": \"Circadian Rhythm\"\n    }\n  ]\n}"

    // const parseResponse : HealthInfluencerVerified = JSON.parse(verifyResearch.choices[0].message.content)
    const parsedResponse : HealthInfluencerVerified = JSON.parse(data);

    await saveInfo(parsedResponse);
    return parsedResponse
  } catch (err) {
    console.log('err at executeResearch', err)
  } finally {
    console.log('success!! finished!!')
  }
}
