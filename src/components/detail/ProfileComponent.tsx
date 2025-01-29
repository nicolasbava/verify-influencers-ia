import { Box, Button, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useResearchContext } from "../../context/GlobalContext";
import { HealthInfluencerVerified } from "../../interfaces/Research";

const ProfileComponent = () => {
    const [categories] = useState(['Neuroscience', 'Sleep', 'Performance', 'Neuroscience', 'Sleep', 'Performance'])
    const { researchResponse } = useResearchContext();
    const [influencerData, setInfluencerData] = useState<HealthInfluencerVerified | null>(null)

    useEffect(() => {
        if(researchResponse){
            setInfluencerData(researchResponse)
        }

    }, [researchResponse])

    return (
        <Grid2 container sx={{alignItems: 'center'}}>
            <Grid2 size={1}>
                {/* PHOTO */}
                <Box sx={{width: '80px', height: '80px', background: 'grey', borderRadius: '50%'}}></Box>
            </Grid2>
            <Grid2 size={10}>
                <Typography mb={1} variant='h4' sx={{fontWeight: 'bold'}}>{influencerData?.name ?? 'undefined'}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 1, gap: 1}}>
                    {categories.map(ele => {
                        return (
                            <Button sx={{borderRadius: '15px', textTransform: 'capitalize'}} size={'small'} variant='contained'>{ele}</Button>
                        )
                    })}
                </Box>
                <Typography mb={2}  variant="body1" sx={{maxWidth: '80%'}} >{influencerData?.biography ?? 'undefined'}</Typography>
            </Grid2>
        </Grid2>
    )
};

export default ProfileComponent;