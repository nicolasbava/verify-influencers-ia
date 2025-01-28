import { Box, Button, Grid2, Typography } from "@mui/material";
import { useState } from "react";

const ProfileComponent = () => {
    const [categories] = useState(['Neuroscience', 'Sleep', 'Performance', 'Neuroscience', 'Sleep', 'Performance'])

    return (
        <Grid2 container sx={{alignItems: 'center'}}>
            <Grid2 size={1}>
                {/* PHOTO */}
                <Box sx={{width: '80px', height: '80px', background: 'grey', borderRadius: '50%'}}></Box>
            </Grid2>
            <Grid2 size={10}>
                <Typography mb={1} variant='h4' sx={{fontWeight: 'bold'}}>Andrew Huberman</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 1, gap: 1}}>
                    {categories.map(ele => {
                        return (
                            <Button sx={{borderRadius: '15px', textTransform: 'capitalize'}} size={'small'} variant='contained'>{ele}</Button>
                        )
                    })}
                </Box>
                <Typography mb={2}  variant="body1" sx={{maxWidth: '80%'}} >Switches are the preferred way to adjust settings on mobile. The option that the switch controls, as well as the state it's in, should be made clear from the corresponding inline label. Switches are the preferred way to adjust settings on mobile. The option that the switch controls, as well as the state it's in, should be made clear from the corresponding inline label.</Typography>

            </Grid2>
        </Grid2>
    )
};

export default ProfileComponent;