import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { HealthInfluencer, HealthInfluencerVerified, Journal, Message } from "../interfaces/Research";

const API_KEY = "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";
const BASE_URL = "https://api.perplexity.ai/chat/completions";
const generateId = () => crypto.randomUUID();


// interface ChatCompletionResponse {
//   choices: {
//     message: Message;
//   }[];
// }

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
  try {
    const docRef = await addDoc(collection(db, "health-influencers"), data);
    console.log("Data saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error saving tweet: ", e);
  }
};

// Promise<HealthInfluencerVerified>
const verifyClaims = async (
  research: HealthInfluencer,
  journals: Journal[]
) => {
  try {
    // Function to process selected journals
    console.log('>> research', research)
    console.log('>> journals', journals)
    const processJournals = (journals: Journal[]): string => {
      const selectedJournals = journals
        .filter(journal => journal.selected)
        .map(journal => journal.name);
      return selectedJournals.length > 0
        ? `The following scientific journals will be used as references: ${selectedJournals.join(", ")}.`
        : "No specific scientific journals were selected.";
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
        ${research.claims.map((claim, index) => `- ${index + 1}. ${claim}`).join("\n")}

        **Instructions:**  
        - Search for evidence in the selected journals.  
        - Return a JSON object with the following structure:
        
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
    // const response = await axios.post<ChatCompletionResponse>(
    //   BASE_URL,
    //   {
    //     model: "sonar-pro",
    //     messages,
    //     format: "json", // Ensures AI responds with pure JSON
    //   },
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${API_KEY}`,
    //     },
    //   }
    // );

    // Validate the response is valid JSON before storing it
    // if (!response.data || typeof response.data !== "object") {
    //   throw new Error("Invalid response format: Expected a JSON object.");
    // }

    console.log("Messages sent:", messages);
    // console.log("Response received:", response.data);

    // return response.data as HealthInfluencerVerified;
    return []
  } catch (error: any) {
    console.error("Error fetching chat completion:", error.response || error);
    throw error.response?.data || error.message;
  }
};


export const fetchDataFromIA = async (
  messages: Message[]
): Promise<HealthInfluencer> => {
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

    const response : {data:HealthInfluencer} = {
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

    // const transformedClaims = transformClaims(response.data);
    // console.log('transformedClaims', transformedClaims)

    // saveInfo(response.data)
    // console.log('response:', response.data)
    return resClaimsProcessed;
    // return response.data;
  } catch (error: any) {
    console.error("Error fetching chat completion:", error.response || error);
    throw error.response?.data || error.message;
  }
};

export const executeResearchAndVerify = async (messages: Message[], journals: Journal[]) => {

  try {
    const researchFromIA = await fetchDataFromIA(messages);
    if (!researchFromIA) throw new Error("Research data is undefined or invalid.");
    console.log('pre messages', messages);
    console.log('researchFromIA', researchFromIA);
    
    const verifyResearch = await verifyClaims(researchFromIA, journals);
    if (!verifyResearch) throw new Error("Failed to verify claims.");
  } catch (err) {
    console.log('err at executeResearch', err)
  } finally {
    alert('finished')
  }
}
