import { createContext, useState, ReactNode, useContext } from 'react';
import { HealthInfluencerVerified } from '../interfaces/Research';

// Define el tipo de los datos que se compartirán en el contexto
interface ResearchContextType {
    userInput: string;
    setUserInput: (value: string) => void;
    journals: { name: string; selected: boolean }[];
    setJournals: (journals: { name: string; selected: boolean }[]) => void;
    includeRevenueAnalysis: boolean;
    setIncludeRevenueAnalysis: (value: boolean) => void;
    timeRange: TimeRange;
    setTimeRange: (value: TimeRange) => void;
    researchResponse: HealthInfluencerVerified | null;
    setResearchResponse: (value: HealthInfluencerVerified) => void;
}

// Define el tipo para el TimeRange (si no lo tienes ya)
enum TimeRange {
    LAST_WEEK = "LAST_WEEK",
    LAST_MONTH = "LAST_MONTH",
    LAST_YEAR = "LAST_YEAR",
    ALL_TIME = "ALL_TIME",
}

// Crea el contexto con un valor por defecto
const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useResearchContext = () => {
    const context = useContext(ResearchContext);
    if (!context) {
        throw new Error("useResearchContext must been used inside ResearchProvider");
    }
    return context;
};

// Proveedor del contexto
export const ResearchProvider = ({ children }: { children: ReactNode }) => {
    const [userInput, setUserInput] = useState("");
    const [journals, setJournals] = useState([
        { name: 'PubMed Central', selected: true },
        { name: 'Nature', selected: false },
        { name: 'Science', selected: false },
        { name: 'Cell', selected: true },
    ]);
    const [includeRevenueAnalysis, setIncludeRevenueAnalysis] = useState(true);
    const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LAST_WEEK);
    const [researchResponse, setResearchResponse] = useState<HealthInfluencerVerified | null>({
        "id": "huberman_2024_01",
        "name": "Andrew Huberman",
        "biography": "Andrew Huberman is a neuroscientist and tenured professor at Stanford University School of Medicine. He hosts the popular Huberman Lab podcast, focusing on neuroscience and science-based tools for everyday life.",
        "qFollowers": 6100000,
        "yearlyRevenue": 5000000,
        "claims": [
          {
            "id": "39b5477c-1d6e-4433-a098-53a16cc6212c",
            "text": "Cheating in relationships can have negative impacts on mental and physical health.",
            "trustScore": 80,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5709195/",
            "category": "Mental Health",
            "url": "https://www.youtube.com/watch?v=A-iYi2d4LSs",
            "date": "27-03-2024"
          },
          {
            "id": "31477896-81e6-4300-ac66-3149ef1bd36a",
            "text": "Marijuana use can affect brain function and body processes.",
            "trustScore": 85,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3930618/",
            "category": "Neuroscience",
            "url": "https://www.youtube.com/watch?v=A-iYi2d4LSs",
            "date": "10-05-2024"
          },
          {
            "id": "c371fbc3-13d8-41d9-afa7-68c83a596774",
            "text": "Defining relationships clearly is important for emotional well-being.",
            "trustScore": 70,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6128439/",
            "category": "Psychology",
            "url": "https://www.youtube.com/watch?v=A-iYi2d4LSs",
            "date": "10-05-2024"
          },
          {
            "id": "63432e62-b43c-4515-8c8b-9487beabffde",
            "text": "Human behavior and decision-making are complex and influenced by various factors.",
            "trustScore": 90,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2864000/",
            "category": "Behavioral Science",
            "url": "https://unfilteredonline.com/huberman-on-trial-examining-the-evidence/",
            "date": "15-04-2024"
          },
          {
            "id": "34526d2a-c43f-462f-9c27-8611d3f0508c",
            "text": "Scientific research should be critically examined and not overgeneralized.",
            "trustScore": 95,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1182327/",
            "category": "Scientific Method",
            "url": "https://unfilteredonline.com/huberman-on-trial-examining-the-evidence/",
            "date": "15-04-2024"
          }
        ]
      })

    return (
        <ResearchContext.Provider
            value={{
                userInput,
                setUserInput,
                journals,
                setJournals,
                includeRevenueAnalysis,
                setIncludeRevenueAnalysis,
                timeRange,
                setTimeRange,
                researchResponse,
                setResearchResponse
            }}
        >
            {children}
        </ResearchContext.Provider>
    );
};