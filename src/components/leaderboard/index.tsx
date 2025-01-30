import { Box, Typography } from "@mui/material";
import InfoBoxes from "./InfoBoxes";
import BasicTable from "./Table";
import { useEffect, useState } from "react";
import { fetchPagedData } from "../../api/firebase";

export interface Influencer {
    rank: number;
    name: string;
    category: string;
    trustScore: string;
    trend: string;
    followers: string;
    verifiedClaims: number;
    id: string
}

// Example usage
// const influencers: Influencer[] = [
//     {
//         rank: 1,
//         name: "Dr. Peter Atila",
//         category: "Medicine",
//         trustScore: "94%",
//         trend: "~*",
//         followers: "1.2M+",
//         verifiedClaims: 203
//     },
//     {
//         rank: 2,
//         name: "Dr. Rhonda Patrick",
//         category: "Nutrition",
//         trustScore: "91%",
//         trend: "~*",
//         followers: "980K+",
//         verifiedClaims: 156
//     },
//     {
//         rank: 3,
//         name: "Dr. Chris Palmer",
//         category: "Mental_health",
//         trustScore: "90%",
//         trend: "~*",
//         followers: "180K+",
//         verifiedClaims: 76
//     },
//     {
//         rank: 4,
//         name: "Andrew Huberman",
//         category: "Neuroscience",
//         trustScore: "89%",
//         trend: "~*",
//         followers: "4.2M+",
//         verifiedClaims: 127
//     },
//     {
//         rank: 5,
//         name: "Dr. Dominic D'Agostino",
//         category: "Nutrition",
//         trustScore: "89%",
//         trend: "~*",
//         followers: "290K+",
//         verifiedClaims: 112
//     },
//     {
//         rank: 6,
//         name: "Dr. Gabrielle Lyon",
//         category: "Medicine",
//         trustScore: "88%",
//         trend: "~*",
//         followers: "380K+",
//         verifiedClaims: 84
//     },
//     {
//         rank: 7,
//         name: "Dr. David Sinclair",
//         category: "Longevity",
//         trustScore: "87%",
//         trend: "~*",
//         followers: "1.1M+",
//         verifiedClaims: 145
//     }
// ];

const LeaderBoardComponent = () => {
    const [leaderBoardData, setLeaderBoardData] = useState<Influencer[]>([]);
    const [lastDoc] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const pageSize = 10;
          const { data }  = await fetchPagedData(pageSize, lastDoc);
          console.log('data: ', data)
        //   const parsedData : Influencer[] = data
            setLeaderBoardData(
                data.map((item) => ({
                    id: item.id,
                    rank: 0, // Default rank
                    name: 'Unknown', // Default name
                    category: 'Unknown', // Default category
                    trustScore: '0', // Default trust score
                    trend: 'Stable', // Default trend
                    followers: '0', // Default followers
                    verifiedClaims: 0, // Default verified claims
                }))
            );
        //   setLeaderBoardData(parsedData); // Update the state with the fetched data
        //   setLastDoc(lastVisible); // Update the last document for pagination
        } catch (error) {
          console.error("Error fetching leaderboard data: ", error);
        }
      };
  
      fetchData(); // Call the async function
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box mb={2}>
            <Typography mb={1} sx={{fontWeight: 'bold', fontSize: '39px'}}>Influencer Trust Leaderboard</Typography>
            <Typography mb={4} variant="body1" sx={{color: '#f9f9f98f', maxWidth: {xs: '100%', md: '60%'}}}>Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.</Typography>
            <InfoBoxes />
            <BasicTable data={leaderBoardData} />
        </Box>
    )
};

export default LeaderBoardComponent;