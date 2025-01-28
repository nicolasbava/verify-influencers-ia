import { Box, Divider, Typography } from "@mui/material";

const ClaimDetail = () => {

    return (
        <Box my={4}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb:1}}>
                <Box  sx={{display: 'flex', alignItems: 'center',}}>
                    <Box sx={{background: '#ffffff26', width: '15px', borderRadius: '25px', height: '10px', mr: 2}}></Box>
                    <Typography>Verified</Typography>
                </Box>
                <Box >
                    <Typography fontWeight='bold'>92%</Typography>
                    <Typography variant='caption' >Trust Score</Typography>
                </Box>
            </Box>

            <Box>
                <Box  mb={2}>
                    <Typography mb={1} sx={{fontWeight: 'bold', fontSize: '18px'}} >Viewing sunlight within 30-50 minutes of waking enhances cortisol release</Typography>
                    <Typography sx={{color: 'secondary.light', fontWeight: 'bold'}} >View source</Typography>
                </Box>
                <Box ml={4} mb={4}>
                    <Typography  mb={1} sx={{fontWeight: 'bold'}} >AI Analisys</Typography>
                    <Typography  mb={1} sx={{color: '#ffffff80'}} >Viewing sunlight within 30-50 minutes of waking enhances cortisol release</Typography>
                    <Typography sx={{color: 'secondary.light', mb:1, fontWeight: 'bold'}}>View Research</Typography>
                </Box>
            </Box>

            <Divider sx={{background: 'grey'}} />
        </Box>
    )
}

export default ClaimDetail;