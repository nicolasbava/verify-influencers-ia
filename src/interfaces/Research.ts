export interface Message {
    role: 'user' | 'assistant' | 'system',
    content: string
}

export interface Journal {
    name: string,
    selected: boolean
}

export type Claim = {
    id: string,
    text: string,
    trustScore: number,
    status: string
    verifyLinkReference: string,
    category: string
}

export interface ChatCompletionRequest {
    role: string,
    content: string
}

export interface ChatCompletionResponse {
    choices: {
      message: Message;
    }[];
  }

export interface HealthInfluencer { 
    name: string,
    id: string,
    claims: string[],
    biography: string,
    qFollowers?: number,
    yearlyRevenue?: number,
    trustPercentage?: number
}

export interface HealthInfluencerVerified { 
    name: string,
    id: string,
    claims: Claim[],
    biography: string,
    qFollowers?: number
    yearlyRevenue?: number
    totalTrustPercentage?: number,
    categories?: string[]

}