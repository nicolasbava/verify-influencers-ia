import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const API_KEY = "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"; // Replace with your actual API key
const BASE_URL = "https://api.perplexity.ai/chat/completions";
const generateId = () => crypto.randomUUID();

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

// interface ChatCompletionRequest {
//   model: string;
//   messages: Message[];
// }

interface ChatCompletionResponse {
  choices: {
    message: Message;
  }[];
}

const transformClaims = (data) => {
  return {
    ...data,
    claims: data.claims.map((claim) => ({
      id: generateId(),
      claim: claim,
      trueScore: 0, // Genera un score aleatorio del 0 al 99
      verified: 'Debunked', // Asigna un estado aleatorio
      category: "none", // Cambia esto según necesites categorizar las afirmaciones
    })),
  };
};

// verified: ['Verified', 'Questionable', 'Debunked'][Math.floor(Math.random() * 3)], // Asigna un estado aleatorio

const saveInfo = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "health-influencers"), data);
    console.log("Data saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error saving tweet: ", e);
  }
};

export const fetchDataFromIA = async (
  _messages: Message[]
): Promise<ChatCompletionResponse> => {
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

    // const payload = {
    //   id: 'jfdkñla',
    //   name: 
    // }

    const response = {
      data: { "id": generateId(), "name": "Dr. Rhonda Patrick", "biography": "Dr. Rhonda Patrick is a scientist and health educator with a Ph.D. in Biomedical Science. She is the founder of FoundMyFitness, where she shares evidence-based insights on nutrition, aging, and disease prevention. Dr. Patrick conducts research on micronutrients, metabolism, and longevity, and is an associate scientist at the Fatty Acid Research Institute.", "claims": [ "Vitamin D deficiency affects about 70% of the population, with levels below 30 ng/mL considered inadequate", "Optimal vitamin D levels are between 40-60 ng/mL for lowest all-cause mortality risk", "Taking 4,000 IU of vitamin D daily can decrease epigenetic age by almost 2 years in deficient individuals", "Magnesium deficiency impairs DNA damage repair, potentially increasing cancer risk", "For every 100 mg increase in magnesium intake, there's a 24% decrease in pancreatic cancer risk", "People with the highest magnesium levels have a 40% lower all-cause mortality and 50% lower cancer mortality", "Omega-3 deficiency from seafood sources is responsible for about 84,000 deaths per year", "Vigorous exercise is considered one of the best 'longevity drugs' for delaying aging and improving healthspan", "Increasing VO2 max through exercise can significantly affect life expectancy", "Vigorous exercise can reverse up to 20 years of heart aging", "Exercise, particularly vigorous exercise, increases BDNF levels, benefiting brain health", "Microplastics pose a significant health risk, with potential links to various diseases including cancer and autism", "Dietary fiber may help prevent microplastics absorption in the body" ] }
    }

    const outputData = transformClaims(response.data);
    console.log('outputData', outputData)

    // saveInfo(response.data)
    console.log('response:', response.data)
    return response.data;
  } catch (error: any) {
    console.error("Error fetching chat completion:", error.response || error);
    throw error.response?.data || error.message;
  }
};