import { Box, Button, FormControlLabel, Grid2, Switch, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { styled } from "@mui/system";
import { useState } from "react";
import { IOSSwitch } from "../../utils/iosSwitch";

const BORDER_BOX = '#41c79a6b';
const BORDER_BOX_INACTIVE = '#80808042';
const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    border: `2px solid ${BORDER_BOX}`,
    color: theme.palette.secondary.main,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    textAlign: "center",
    // marginRight: 8,
    cursor: 'pointer'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    border: `2px solid ${BORDER_BOX}`,
    color: theme.palette.secondary.main,
    padding: '4px 8px',
    borderRadius: '8px',
    textAlign: "center",
    // marginRight: 8,
    cursor: 'pointer',
    width: '-webkit-fill-available',
}));

const StyledButtonInactive = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    border: `2px solid ${BORDER_BOX_INACTIVE}`,
    color: 'white',
    padding: '4px 8px',
    borderRadius: '8px',
    textAlign: "center",
    // marginRight: 8,
    cursor: 'pointer',
    width: '-webkit-fill-available',
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const ResearchForm = () => {
    const [revenueAnalisys, setRevenueAnalisys] = useState<boolean>(false)
    const [journals, setJournals] = useState<string[]>([{name: 'PubMed Central', selected: true}, {name: 'Nature', selected: true}, {name: 'Science', selected: true}, {name: 'Cell', selected: true}])
    
    return (
        <Box sx={{border: '1px solid #80808042', padding: '24px 24px', borderRadius: '8px', background: theme.palette.primary.light}}>
            <Box sx={{mb: 4}}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <SettingsOutlinedIcon sx={{marginRight: 1, color:'secondary.light'}} />
                    <Typography variant="h6" fontWeight={'bold'}> Research Configuration</Typography>
                </Box>
                <Grid2 container spacing={1}>
                    <Grid2 size={6}>
                        <StyledBox>
                            <Typography>Specific Influencer</Typography>
                            <Typography>Research a known health influencer by name</Typography>
                        </StyledBox>
                    </Grid2>
                    <Grid2 size={6}>
                        <StyledBox>
                            <Typography>Discover New</Typography>
                            <Typography>Find and analyze new health influencers</Typography>
                        </StyledBox>
                    </Grid2>
                </Grid2>
            </Box>

            <Grid2 container spacing={3}>
                <Grid2 size={6} mb={2}>
                    <Box mb={3}>
                        <Typography mb={1}>Time Range</Typography>
                        <Grid2 container spacing={1}>
                            <Grid2 size={6}>
                                <StyledButton>Last Week</StyledButton>
                            </Grid2>
                            <Grid2 size={6}>
                                <StyledButton>Last Month</StyledButton>
                            </Grid2>
                            <Grid2 size={6}>
                                <StyledButtonInactive>Last Year</StyledButtonInactive>
                            </Grid2>
                            <Grid2 size={6}>
                                <StyledButtonInactive>All Time</StyledButtonInactive>
                            </Grid2>
                        </Grid2>
                    </Box>
                    <Box mb={3}>
                        <Typography mb={1}>Influencer Name</Typography>
                        <TextField size={'small'}  id="outlined-basic" label="Outlined" variant="outlined" />
                    </Box>
                    
                    <Box mb={2}>
                        <Typography mb={1}>Claims to analyze per influencer</Typography>
                        <TextField size={'small'}  id="outlined-basic" label="Outlined" variant="outlined" /><br/>
                        <Typography variant="caption">Recommended: 50-100 claims for comprehensive analysis</Typography>
                    </Box>


                </Grid2>

                <Grid2 size={6} mb={2}>
                    <Box mb={3}>
                        <Typography mb={1}>Products To Find Per Influencer</Typography>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" size={'small'} /><br/>
                        <Typography variant="caption" mb={1}>Set up to 0 to skip product research</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                        <Box>
                            <Typography>Include Revenue Analysis</Typography>
                            <Typography variant="caption" >Analyze monetization methods and estimate earnings</Typography>
                        </Box>
                            <FormControlLabel
                                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                label=""
                            />
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box>
                            <Typography>Verify with Scientific Journals</Typography>
                            <Typography variant="caption" >Cross-reference claims with scientific literature</Typography>
                        </Box>
                            <FormControlLabel
                                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                label=""
                            />
                    </Box>
                </Grid2>
            </Grid2>

            <Box mb={2}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography>Specific Journals</Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', color: 'secondary.light'}}>
                        <Button sx={{color: 'secondary.light', textTransform: 'capitalize'}}>Select All</Button>
                        <span>|</span>
                        <Button sx={{color: 'secondary.light', textTransform: 'capitalize'}}>Deselect All</Button>
                    </Box>
                </Box>
                <Grid2 container spacing={1} mb={2}>
                    
                        {journals.map( ele => {
                            return (
                                <Grid2 size={6}>
                                    <StyledButton>
                                        { ele.name }
                                    </StyledButton>
                                </Grid2>
                            )
                        }) }
                    
                </Grid2>
                <Button sx={{color: 'secondary.light', textTransform: 'capitalize'}}>+ Add New Journal</Button>
            </Box>

            <Box mb={3}>
                <Typography>Notes for Research Assistant</Typography>
                <TextField
                    label="Comments"
                    multiline
                    rows={5}
                    variant="outlined"
                    fullWidth
                    sx={{
                        // backgroundColor: "#f5f5f5",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "grey",
                        },
                        },
                    }}
                />
            </Box>

            <Box>
                <Button sx={{color: 'secondary.light', textTransform: 'capitalize', marginLeft: 'auto'}} variant="contained">+ Start Research</Button>
            </Box>
        </Box>
    )
}

export default ResearchForm;