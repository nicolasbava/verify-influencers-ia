import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
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

// const saveInfo = async (data: HealthInfluencerVerified) => {
//   console.log('data to save', data)
//   // TODO find if dr name is not already saved to avoid saving duplicates
//   try {
//     const docRef = await addDoc(collection(db, "health-influencers"), data);
//     console.log("Data saved with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error saving tweet: ", e);
//   }
// };


const saveInfo = async (data: HealthInfluencerVerified) => {
  console.log("Data to save", data);

  try {
    // Verificar si ya existe un influencer con el mismo nombre
    const influencersRef = collection(db, "health-influencers");
    const q = query(influencersRef, where("name", "==", data.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.warn("This influencer is already saved:", data.name);
      return; // Evita guardar duplicados
    }

    // Guardar solo si el nombre no está duplicado
    const docRef = await addDoc(influencersRef, data);
    console.log("Data saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error saving influencer: ", e);
  }
};

// Promise<HealthInfluencerVerified>
const verifyClaimsWithJournals = async (
  research: HealthInfluencerVerified,
  journals: Journal[],
// ) : Promise<ChatCompletionResponse>  => {
)  => {
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
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY_IA}`,
        },
      }
    );

    // const response = { data: {}}

    // Validate the response is valid JSON before storing it
    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid response format: Expected a JSON object.");
    }
    const parsedData = JSON.parse(response.data.choices[0].message.content)
    console.log(">>> Messages sent:", messages);
    // console.log("Response received:", response.data);
    console.log('>>> parsedData', parsedData)
    console.log('>>> response', response)
    // return messages
    return response;
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
    const response = await axios.post<ChatCompletionResponse>(
      import.meta.env.VITE_BASE_URL,
      {
        model: "sonar-pro",
        messages,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY_IA}`,
        },
      }
    );

    // const response : { data: HealthInfluencer } = {
    //   data: { 
    //     id: generateId(), 
    //     name: "Dr. Rhonda Patrick", 
    //     biography: "Dr. Rhonda Patrick is a scientist and health educator with a Ph.D. in Biomedical Science. She is the founder of FoundMyFitness, where she shares evidence-based insights on nutrition, aging, and disease prevention. Dr. Patrick conducts research on micronutrients, metabolism, and longevity, and is an associate scientist at the Fatty Acid Research Institute.",  claims: [
    //       "Fasting will increase testosterone levels",
    //       "Longer fasting will increase growth hormone levels",
    //       "Exercise intensity as if being chased with a syringe of poison can boost performance",
    //       "Viewing sunlight within 30-60 minutes of waking enhances cortisol release"
    //     ],
    //     qFollowers: 6100000,
    //     yearlyRevenue: 5000000
    //   }
    // }
    console.log('<< response', response.data.choices[0].message.content)
    console.log('<< response DATA', JSON.parse(response.data.choices[0].message.content))


    const transformedClaims = transformClaims(JSON.parse(response.data.choices[0].message.content))

    console.log('<< messages', messages)
    console.log('<< transformedClaims', transformedClaims)

    // console.log('response:', response.data)
    return transformedClaims;
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

export const executeResearchAndVerify = async (messages: Message[], journals: Journal[], verifyClaims: boolean) => {
  try {
    const researchFromIA = await fetchDataFromIA(messages);
    if (!researchFromIA) throw new Error("Research data is undefined or invalid.");

    if(verifyClaims === false){
      await saveInfo(researchFromIA)
      return researchFromIA
    }
    
    try{
      const verifyResearch = await verifyClaimsWithJournals(researchFromIA, journals);
      const parsedResponse : HealthInfluencerVerified = JSON.parse(verifyResearch.data.choices[0].message.content)
      await saveInfo(parsedResponse);
      return parsedResponse

    } catch (error){
      
      console.log('Error claims verify', error)
      throw new Error("Failed to verify claims.");
    }

  } catch (err) {
    console.log('err at executeResearch', err)
  } finally {
    console.log('success!! finished!!')
  }
}


// {
//   "id": "huberman_analysis_20250130",
//   "name": "Andrew Huberman",
//   "biography": "Andrew Huberman is a Stanford University neuroscientist and popular podcaster known for his Huberman Lab podcast. He focuses on health optimization and neuroscience, providing science-based protocols for improving well-being and performance.",
//   "qFollowers": 6100000,
//   "yearlyRevenue": 5000000,
//   "claims": [
//       {
//           "id": "780930ac-2d41-41a9-8efd-076c7c97b325",
//           "text": "Marijuana use can negatively affect brain and body function",
//           "trustScore": 80,
//           "status": "Verified",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6223748/",
//           "category": "Neuroscience"
//       },
//       {
//           "id": "1bd21369-5cdc-457a-a4a0-6df921a9a179",
//           "text": "The distinction between indica and sativa cannabis strains is significant",
//           "trustScore": 20,
//           "status": "Debunked",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5576603/",
//           "category": "Botany"
//       },
//       {
//           "id": "f859e9fe-105b-4f28-b1f5-4b0c0ae6814d",
//           "text": "Viewing sunlight within 30-60 minutes of waking enhances cortisol release",
//           "trustScore": 60,
//           "status": "Questionable",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6751071/",
//           "category": "Endocrinology"
//       },
//       {
//           "id": "2664a784-216d-4599-a0fb-4290f543183c",
//           "text": "Cold exposure can increase dopamine levels by up to 2,000%",
//           "trustScore": 10,
//           "status": "Debunked",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4956532/",
//           "category": "Neuroscience"
//       },
//       {
//           "id": "aa3c6d45-f1f0-4361-a0ca-c185922d3b62",
//           "text": "Grounding (connecting to the earth) has scientific evidence for health benefits",
//           "trustScore": 30,
//           "status": "Questionable",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4378297/",
//           "category": "Alternative Medicine"
//       },
//       {
//           "id": "4db58219-652b-4700-bcc3-d3c82e118c6a",
//           "text": "Non-sleep deep rest protocols can improve cognitive function",
//           "trustScore": 50,
//           "status": "Questionable",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6122651/",
//           "category": "Cognitive Science"
//       },
//       {
//           "id": "88c31da2-f434-4779-a7d0-1f9c24002236",
//           "text": "Specific breathing techniques can modulate the nervous system",
//           "trustScore": 75,
//           "status": "Verified",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/",
//           "category": "Physiology"
//       },
//       {
//           "id": "9d3664d2-1665-4135-a87e-f64eaa0b2e93",
//           "text": "Intermittent fasting can enhance metabolic health",
//           "trustScore": 70,
//           "status": "Verified",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6128599/",
//           "category": "Nutrition"
//       },
//       {
//           "id": "433695bc-a5d7-41b0-a321-269adfe7a327",
//           "text": "Certain supplements can boost cognitive performance",
//           "trustScore": 40,
//           "status": "Questionable",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4640568/",
//           "category": "Neuroscience"
//       },
//       {
//           "id": "e05905ff-571d-4e33-a656-226ba7deb628",
//           "text": "Regular exercise can improve neuroplasticity",
//           "trustScore": 85,
//           "status": "Verified",
//           "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6770965/",
//           "category": "Neuroscience"
//       }
//   ]
// }
