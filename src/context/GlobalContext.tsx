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
    apiKey: string;
    setAPIKey: (value: string) => void;
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
    const [researchResponse, setResearchResponse] = useState<HealthInfluencerVerified | null>(null)
    const [apiKey, setAPIKey] = useState<string>('')

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
                setResearchResponse,
                apiKey,
                setAPIKey,
            }}
        >
            {children}
        </ResearchContext.Provider>
    );
};