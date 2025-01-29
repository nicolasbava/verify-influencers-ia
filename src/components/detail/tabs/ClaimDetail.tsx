import { Box, Divider, Typography } from "@mui/material";
import { Claim } from "../../../interfaces/Research";
// import { useState } from "react";

interface ClaimDetailProps {
    claim: Claim;
}

const ClaimDetail = ({ claim }: ClaimDetailProps) => {
    // const [sortBy, setSortBy] = useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setSortBy(event.target.value as string);
    // };

    return (
        <Box my={4}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb:1}}>
                <Box  sx={{display: 'flex', alignItems: 'center',}}>
                    <Box sx={{background: '#ffffff26', width: '15px', borderRadius: '25px', height: '10px', mr: 2}}></Box>
                    <Typography>{claim.status}</Typography>
                </Box>
                <Box >
                    <Typography fontWeight='bold'>{claim.trustScore}%</Typography>
                    <Typography variant='caption' >Trust Score</Typography>
                </Box>
            </Box>

            <Box>
                <Box  mb={2}>
                    <Typography mb={1} sx={{fontWeight: 'bold', fontSize: '18px'}} >{claim.text}</Typography>
                    <Typography sx={{color: 'secondary.light', fontWeight: 'bold'}} >View source</Typography>
                </Box>
                <Box ml={4} mb={4}>
                    <Typography  mb={1} sx={{fontWeight: 'bold'}} >AI Analisys</Typography>
                    <Typography  mb={1} sx={{color: '#ffffff80'}} >Multiple studies confirm that..</Typography>
                    <Typography sx={{color: 'secondary.light', mb:1, fontWeight: 'bold'}}>{claim.verifyLinkReference}</Typography>
                </Box>
            </Box>

            <Divider sx={{background: 'grey'}} />
        </Box>
    )
}

export default ClaimDetail;