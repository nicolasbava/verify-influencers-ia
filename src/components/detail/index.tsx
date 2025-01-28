import { Box } from "@mui/material";
import ProfileComponent from "./ProfileComponent";
import InfoBoxes from "./InfoBoxes";
import DetailTabs from "./tabs";

const InfluencerDetailComponent = () => {
    return (
        <Box sx={{width: '80vw'}}>
            <ProfileComponent />
            <InfoBoxes />
            <DetailTabs />
        </Box>
    )
};

export default InfluencerDetailComponent;