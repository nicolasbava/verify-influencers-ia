import { Box, Grid2, styled, Typography } from "@mui/material";
import { StyledBox } from "../styled";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

const NumberBold = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '28px'
});

const InfoBoxes = () => {
    return (
        <Box mb={4}>
            
            <Grid2 container spacing={3}>
                <Grid2 size={4}>
                    <StyledBox sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <PeopleAltOutlinedIcon />
                        
                        <Box>
                            <NumberBold>1,234</NumberBold>
                            <Typography sx={{color: '#f9f9f98f'}}>Active Influencers</Typography>
                        </Box>
                    </StyledBox>
                </Grid2>
                <Grid2 size={4}>
                    <StyledBox sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <TaskAltOutlinedIcon />
                        
                        <Box>
                            <NumberBold>24,234</NumberBold>
                            <Typography sx={{color: '#f9f9f98f'}}>Claims Verified</Typography>
                        </Box>
                    </StyledBox>
                </Grid2>
                <Grid2 size={4}>
                    <StyledBox sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <BarChartOutlinedIcon />
                        
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