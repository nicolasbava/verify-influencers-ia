import { Box, Typography } from "@mui/material";
import ResearchForm from "./ResearchForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

const ResearchComponent = () => {
    return (
        <Box sx={{width: '60vw'}}>
            <Link to='/leaderboard'>
                <Box sx={{display: 'flex', mb: 2, alignItems: 'center'}}>
                    <ArrowBackIcon sx={{color: 'secondary.light', mr: 1}} /> 
                    <Typography mr={2} sx={{color: 'secondary.light'}}>Back to LeaderBoard</Typography>
                    <Typography variant="h5" fontWeight='bold'>Research Tasks</Typography>
                </Box>
            </Link>
            <ResearchForm />
        </Box>
    )
}

export default ResearchComponent;