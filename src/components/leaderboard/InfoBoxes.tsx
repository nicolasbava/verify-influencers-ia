import { Box, Button, Grid2, styled, Typography } from "@mui/material";
import { StyledBox } from "../styled";

const NumberBold = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '28px'
});

const BORDER_BOX = '#41c79a6b';
const BORDER_BOX_INACTIVE = '#80808042';

const ButtonGreen = styled(Button)(() => ({
    padding: '4px 12px',
    textTransform: 'capitalize',
    borderRadius: '25px',
    background: '#0ea06f',
    color: 'white'
}));


const InfoBoxes = () => {
    return (
        <Box mb={4}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center', }}>
                    <ButtonGreen>All categories</ButtonGreen>

                </Box>
                <Button variant='contained' sx={{color: 'white'}}>Highest first</Button>
            </Box>
            <Grid2 container>
                <Grid2 size={4}>
                    <StyledBox sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <Typography>icon</Typography>
                        
                        <Box>
                            <NumberBold>1,234</NumberBold>
                            <Typography sx={{color: '#f9f9f98f'}}>Active Influencers</Typography>
                        </Box>
                    </StyledBox>
                </Grid2>
                <Grid2 size={4}>
                    <StyledBox sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <Typography>icon</Typography>
                        
                        <Box>
                            <NumberBold>24,234</NumberBold>
                            <Typography sx={{color: '#f9f9f98f'}}>Claims Verified</Typography>
                        </Box>
                    </StyledBox>
                </Grid2>
                <Grid2 size={4}>
                    <StyledBox sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <Typography>icon</Typography>
                        
                        <Box>
                            <NumberBold>86,3%</NumberBold>
                            <Typography sx={{color: '#f9f9f98f'}}>Average Trust Score</Typography>
                        </Box>
                    </StyledBox>
                </Grid2>
            </Grid2>
        </Box>
    )
};

export default InfoBoxes;