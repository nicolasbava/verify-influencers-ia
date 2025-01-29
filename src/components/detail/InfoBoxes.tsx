import { Box, Grid2, styled, Typography } from "@mui/material";
import MovingIcon from '@mui/icons-material/Moving';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useResearchContext } from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import { HealthInfluencerVerified } from "../../interfaces/Research";
import { formatRevenue } from "../../utils";

const StyledBox = styled(Box)(({ theme }) => ({
    border: `2px solid #ffffff24`,
    padding: '24px',
    borderRadius: '9px',
    background: theme.palette.primary.light
}));

const StyledInfo = styled(Box)(({ theme }) => ({
    color: theme.palette.secondary.light, 
    fontWeight: 'bold',
    fontSize: '39px'
}));

const StyledTypo = styled(Box)(() => ({
    fontSize: '14px', 
    color: '#ffffff57',
}));


const InfoBoxes = () => {
    const { researchResponse } = useResearchContext();
    const [influencerData, setInfluencerData] = useState<HealthInfluencerVerified | null>(null)

    useEffect(() => {
        if(researchResponse){
            setInfluencerData(researchResponse)
        }

    }, [researchResponse])

    return (
        <Grid2 container spacing={3} mb={4}>
            <Grid2 size={3}>
                <StyledBox>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                        <Typography sx={{fontWeight: 'bold', fontSize: '20px'}}>Trust Score</Typography>
                        <MovingIcon sx={{color: 'secondary.light'}} />
                    </Box>
                    <StyledInfo>{influencerData?.totalTrustPercentage ?? 'undefined'}%</StyledInfo>
                    <StyledTypo>Based on {'127'} claims</StyledTypo> 
                </StyledBox>
            </Grid2>

            <Grid2 size={3}>
                <StyledBox>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                        <Typography sx={{fontWeight: 'bold', fontSize: '20px'}}>Yearly Revenue</Typography>
                        <AttachMoneyIcon sx={{color: 'secondary.light'}} />
                    </Box>
                    <StyledInfo>{formatRevenue(Number(influencerData?.yearlyRevenue)) ?? 'undefined'}</StyledInfo>
                    <StyledTypo>Estimated earnings</StyledTypo>
                </StyledBox>
            </Grid2>

            <Grid2 size={3}>
                <StyledBox>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                        <Typography sx={{fontWeight: 'bold', fontSize: '20px'}}>Products</Typography>
                        <ShoppingBagOutlinedIcon sx={{color: 'secondary.light'}} />
                    </Box>
                    <StyledInfo>1</StyledInfo>
                    <StyledTypo>Recomended products</StyledTypo>
                </StyledBox>
            </Grid2>
            
            <Grid2 size={3}>
                <StyledBox>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                        <Typography sx={{fontWeight: 'bold', fontSize: '20px'}}>Followers</Typography>
                        <MovingIcon sx={{color: 'secondary.light'}} />
                    </Box>
                    <StyledInfo>{formatRevenue(Number(influencerData?.qFollowers)) ?? 'unedefined'}+</StyledInfo>
                    <StyledTypo >Total following</StyledTypo>
                </StyledBox>
            </Grid2>
          
        </Grid2>
    )
};

export default InfoBoxes;