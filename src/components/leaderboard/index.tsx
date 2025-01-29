import { Box, Typography } from "@mui/material";
import InfoBoxes from "./InfoBoxes";
import BasicTable from "./Table";

const LeaderBoardComponent = () => {
    return (
        <Box mb={2}>
            <Typography mb={2} sx={{fontWeight: 'bold', fontSize: '39px'}}>Influencer Trust Leaderboard</Typography>
            <Typography mb={4} variant="body1" sx={{color: '#f9f9f98f', maxWidth: {xs: '100%', md: '60%'}}}>Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.</Typography>
            <InfoBoxes />
            <BasicTable />
        </Box>
    )
};

export default LeaderBoardComponent;