import { Box, Button, Grid2, InputAdornment, styled, TextField, Typography } from "@mui/material";
import ClaimDetail from "./ClaimDetail";
import SearchIcon from "@mui/icons-material/Search";
import { useResearchContext } from "../../../context/GlobalContext";
import { useEffect, useState } from "react";
import { HealthInfluencerVerified } from "../../../interfaces/Research";
import { CustomTextField } from "../../styled";
import theme from "../../../theme";

const ButtonGreen = styled(Button)(() => ({
    padding: '4px 12px',
    textTransform: 'capitalize',
    borderRadius: '25px',
    background: '#0ea06f'
}));

const ButtonGreenSquared = styled(Button)(() => ({
    padding: '4px 12px',
    textTransform: 'capitalize',
    borderRadius: '5px',
    background: '#0ea06f'
}));

const ClaimsTab = () => {
    const { researchResponse } = useResearchContext();
    const [influencerData, setInfluencerData] = useState<HealthInfluencerVerified | null>(null)

    useEffect(() => {
        if(researchResponse){
            setInfluencerData(researchResponse)
        }
    }, [researchResponse])

    return (
        <Box>
            <Box sx={{border: '1px solid #ffffff33', padding: 4, borderRadius: '10px',  mb: 4, background: theme.palette.primary.light}}>
                <Box mb={2}>
                    <CustomTextField
                        variant="outlined"
                        placeholder="Search..."
                        fullWidth
                        size={'small'}
                        slotProps={{
                            input: { 
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />  
                </Box>

                <Box mb={3}>
                    <Typography mb={1}>Categories</Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <ButtonGreen variant='contained'>All Categories</ButtonGreen>
                    </Box>
                </Box>

                <Box>
                    <Grid2 container>
                        <Grid2 size={6}>
                            <Typography mb={1}>Verification Status</Typography>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 1}}>
                                <ButtonGreenSquared variant='contained'>All Statuses</ButtonGreenSquared>
                                <ButtonGreenSquared variant='contained'>Verified</ButtonGreenSquared>
                                <ButtonGreenSquared variant='contained'>Questionable</ButtonGreenSquared>
                                <ButtonGreenSquared variant='contained'>Debunked</ButtonGreenSquared>
                            </Box>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography mb={1}>Sort By</Typography>
                            <TextField />
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
            <Box>
                <Typography mb={2}>Showing 10 claims</Typography>
                {
                    influencerData?.claims && influencerData?.claims.length > 0 ? (
                        influencerData?.claims.map(ele => (
                                <ClaimDetail claim={ele} />
                            )
                        )
                    ) : 'NO CLAIMS FOUND'
                }
                
            </Box>
        </Box>
    )
}

export default ClaimsTab;