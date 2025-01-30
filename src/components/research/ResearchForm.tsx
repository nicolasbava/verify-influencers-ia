import { Box, Button, FormControlLabel, Grid2, InputAdornment, Modal, Typography } from "@mui/material";
import theme from "../../theme";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { styled } from "@mui/system";
import { useState } from "react";
import { IOSSwitch } from "../../utils/iosSwitch";
import { executeResearchAndVerify } from "../../api/perplexityApi";
import { Message } from "../../interfaces/Research";
import { useResearchContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../styled";
import SearchIcon from "@mui/icons-material/Search";

const BORDER_BOX = '#41c79a6b';
const BORDER_BOX_GREY = '#80808070';
const BORDER_BOX_INACTIVE = '#80808042';

const StyledButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
    backgroundColor: active ? theme.palette.secondary.dark : theme.palette.primary.dark,
    border: active ? `2px solid ${BORDER_BOX}` : `2px solid ${BORDER_BOX_INACTIVE}` ,
    color: active ? theme.palette.secondary.main : 'grey',
    padding: '4px 8px',
    borderRadius: '8px',
    textAlign: "center",
    cursor: 'pointer',
    textTransform: 'capitalize',
    width: '-webkit-fill-available',
}));

const StyledButtonJournal = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
    backgroundColor: active ? theme.palette.secondary.dark : theme.palette.primary.dark,
    border: active ? `2px solid ${BORDER_BOX}` : `2px solid ${BORDER_BOX_INACTIVE}` ,
    color: active ? theme.palette.secondary.main : 'grey',
    padding: '8px 8px',
    borderRadius: '8px',
    textAlign: "center",
    cursor: 'pointer',
    textTransform: 'capitalize',
    width: '-webkit-fill-available',
}));


const StyledBox = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.secondary.dark,
    border: active ? `1px solid ${BORDER_BOX_GREY}` :`1px solid ${BORDER_BOX}`,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    textAlign: "center",
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.01)',
    },
}));

enum TimeRange {
    LAST_WEEK = "LAST_WEEK",
    LAST_MONTH = "LAST_MONTH",
    LAST_YEAR = "LAST_YEAR",
    ALL_TIME = "ALL_TIME",
}

const generateSystemMessage = (includeRevenueAnalysis: boolean, timeRange: TimeRange, qMaxClaims: number): string => {
    const basePrompt =
        "You are an AI that searches health claims in tweets and podcast transcripts of health influencers. Provide the result in JSON format with the following structure: { img: (url to a profile image of the health influencer), name, biography (max 75 words), claims (array of object, which the object has {text: (string with the claim), date: (string with the date of the claim as dd-mm-yyy), url: (string with the url to see where the claim was found)}), qFollowers: (number total followers in all social media), category: (The influencer’s professional field, e.g., 'Nature', 'Medicine', 'Fitness', 'Neuroscience', etc.)";

    const revenuePrompt = includeRevenueAnalysis
        ? ", yearlyRevenue: (number in USD)"
        : "";

    const timeRangePrompt =
        timeRange === TimeRange.LAST_WEEK
            ? " Search for tweets and podcast transcripts from the last week."
            : timeRange === TimeRange.LAST_MONTH
            ? " Search for tweets and podcast transcripts from the last month."
            : timeRange === TimeRange.LAST_YEAR
            ? " Search for tweets and podcast transcripts from the last year."
            : timeRange === TimeRange.ALL_TIME
            ? " Search for tweets and podcast transcripts from all time."
            : " Search for tweets and podcast transcripts.";

    return `${basePrompt}${revenuePrompt} }. Search for a maximum of ${qMaxClaims} claims. ${timeRangePrompt} Focus on extracting health-related claims. Example claim: 'Viewing sunlight within 30-60 minutes of waking enhances cortisol release'. Return only the JSON output and nothing else.`;
};



const ResearchForm = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("");
    const [newJournal, setNewJournal] = useState<string>("");
    const [newResearch, setNewResearch] = useState<boolean>(false);
    const [includeRevenueAnalysis, setIncludeRevenueAnalysis] = useState<boolean>(true);
    const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LAST_WEEK);
    const [qClaimsToFind, setQClaimsToFind] = useState<number>(15);
    const [verifyClaims, setVerifyClaims] = useState<boolean>(true);
    const [notesForAssistant, setNotesForAssistant] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { setResearchResponse } = useResearchContext();
    const navigate = useNavigate();
    const {apiKey} = useResearchContext()
    
    const [journals, setJournals] = useState([
        {name: 'PubMed Central', selected: true}, 
        {name: 'Nature', selected: false}, 
        {name: 'Science', selected: false}, 
        {name: 'Cell', selected: true}
    ])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        color: 'white',
        bgcolor: 'primary.light',
        border: '1px solid grey',
        borderRadius: '15px',
        boxShadow: 24,
        p: 4,
    };

      
    const addNewJournal = (journal: string) => {
        const newJournal = {
            name: journal,
            selected: true
        };
        setJournals(prevJournals => [...prevJournals, newJournal]);
        setNewJournal('');
        handleClose();
    };

        
    const handleSend = async () => {
        if (!userInput.trim()) return;

        const payload : Message[] = [
            { role: "system", content: generateSystemMessage(includeRevenueAnalysis, timeRange, qClaimsToFind)},
            { role: "user", content: `Search for claims of ${userInput}. ${notesForAssistant.length > 0 ? 'Notes added by the user: ' 
                + notesForAssistant : ''}` },
        ];
        setLoading(true);

        try {
            
            const result = await executeResearchAndVerify(payload, journals, verifyClaims, apiKey);
            if(!result) throw new Error('problem with research result')
            // const calculateTotalResults : HealthInfluencerVerified = {
            //     ...result,
            //     totalTrustPercentage: calculateTotalTrustScore(result.claims),
            //     categories: getUniqueCategories(result.claims),
            //     category: ''
            // }
            setResearchResponse(result)
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            setUserInput("");
            navigate('/detail')
        }
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeRevenueAnalysis(event.target.checked);
    };

    const handleChangeVerifyClaims = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerifyClaims(event.target.checked);
    };

    const selectAllJournals = () => {
        setJournals(prevJournals => prevJournals.map(ele => ({ ...ele, selected: true })));
    };

    const deselectAllJournals = () => {
        setJournals(prevJournals => prevJournals.map(ele => ({ ...ele, selected: false })));
    };


    const toggleJournalSelection = (index: number) => {
        setJournals((prevJournals) =>
            prevJournals.map((journal, i) =>
            i === index ? { ...journal, selected: !journal.selected } : journal
            )
        );
    };


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSend();
            }}
        >
            <Box sx={{border: '1px solid #80808042', padding: '24px 24px', borderRadius: '8px', background: theme.palette.primary.light}}>
                <Box sx={{mb: 4}}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                        <SettingsOutlinedIcon sx={{marginRight: 1, color:'secondary.light'}} />
                        <Typography variant="h6" fontWeight={'bold'}> Research Configuration</Typography>
                    </Box>
                    <Grid2 container spacing={1}>
                        <Grid2 size={6}>
                            <StyledBox active={newResearch}  onClick={() => setNewResearch(false)}>
                                <Typography sx={{fontWeight: 'bold', fontSize: '18px'}}>Specific Influencer</Typography>
                                <Typography variant="body1" sx={{opacity: '0.6', fontSize: '13px'}}>Research a known health influencer by name</Typography>
                            </StyledBox>
                        </Grid2>
                        <Grid2 size={6}>
                            <StyledBox active={!newResearch} onClick={() => setNewResearch(true)}>
                                <Typography sx={{fontWeight: 'bold', fontSize: '18px'}}>Discover New</Typography>
                                <Typography variant="body1" sx={{opacity: '0.6', fontSize: '13px'}}>Find and analyze new health influencers</Typography>
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
                                    <StyledButton active={timeRange === TimeRange.LAST_WEEK} onClick={() => setTimeRange(TimeRange.LAST_WEEK)} >Last Week</StyledButton>
                                </Grid2>
                                <Grid2 size={6}>
                                    <StyledButton active={timeRange === TimeRange.LAST_MONTH} onClick={() => setTimeRange(TimeRange.LAST_MONTH)}>Last Month</StyledButton>
                                </Grid2>
                                <Grid2 size={6}>
                                    <StyledButton active={timeRange === TimeRange.LAST_YEAR} onClick={() => setTimeRange(TimeRange.LAST_YEAR)}>Last Year</StyledButton>
                                </Grid2>
                                <Grid2 size={6}>
                                    <StyledButton active={timeRange === TimeRange.ALL_TIME} onClick={() => setTimeRange(TimeRange.ALL_TIME)}>All Time</StyledButton>
                                </Grid2>
                            </Grid2>
                        </Box>
                        <Box mb={3}>
                            <Typography mb={1}>Influencer Name</Typography>
                            <CustomTextField 
                                size={'small'} 
                                id="outlined-basic" 
                                placeholder="Enter influencer name" 
                                variant="outlined" 
                                fullWidth
                                onChange={(ele) => {
                                    setUserInput(ele.target.value)
                                }} 
                                slotProps={{
                                    input: { 
                                        startAdornment:(
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{color:'grey'}} />
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        </Box>
                        
                        <Box mb={2}>
                            <Typography mb={1}>Claims to analyze per influencer</Typography>
                            <CustomTextField 
                                onChange={(ele) => setQClaimsToFind(Number(ele.target.value))} 
                                size={'small'} 
                                fullWidth 
                                value={qClaimsToFind} 
                                id="outlined-basic" 
                                placeholder="15" 
                                variant="outlined" 
                                
                            />
                                <br/>
                            <Typography variant="caption">Recommended: 50-100 claims for comprehensive analysis</Typography>
                        </Box>


                    </Grid2>

                    <Grid2 size={6} mb={2}>
                        <Box mb={3}>
                            <Typography mb={1}>Products To Find Per Influencer</Typography>
                            <CustomTextField fullWidth id="outlined-basic" placeholder="10" variant="outlined" size={'small'} /><br/>
                            <Typography variant="caption" mb={1}>Set up to 0 to skip product research</Typography>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                            <Box>
                                <Typography>Include Revenue Analysis</Typography>
                                <Typography variant="caption" >Analyze monetization methods and estimate earnings</Typography>
                            </Box>
                                <FormControlLabel
                                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked onChange={handleChange} value={includeRevenueAnalysis} />}
                                    label=""
                                />
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Box>
                                <Typography>Verify with Scientific Journals</Typography>
                                <Typography variant="caption" >Cross-reference claims with scientific literature</Typography>
                            </Box>
                                <FormControlLabel
                                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked onChange={handleChangeVerifyClaims} value={verifyClaims} />}
                                    label=""
                                />
                        </Box>
                    </Grid2>
                </Grid2>

                <Box mb={2}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography>Specific Journals</Typography>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Button onClick={() => selectAllJournals()} sx={{color: 'secondary.light', textTransform: 'capitalize'}}>Select All</Button>
                            <span style={{opacity: '0.3'}}>|</span>
                            <Button onClick={() => deselectAllJournals()} sx={{color: 'secondary.light', textTransform: 'capitalize'}}>Deselect All</Button>
                        </Box>
                    </Box>
                    <Grid2 container spacing={1} mb={2}>

                        {journals.map((journal, index) => (
                            <Grid2 key={journal.name} size={6}>
                                <StyledButtonJournal
                                    active={journal.selected}
                                    onClick={() => toggleJournalSelection(index)}
                                    fullWidth
                                >
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                       <Typography sx={{fontSize: '14px'}}>{journal.name}</Typography> 
                                       <Box sx={{width: '10px', height: '10px', background: journal.selected ? '#41c79a' : BORDER_BOX_GREY, borderRadius: '50%'}}></Box>

                                    </Box>
                                </StyledButtonJournal>
                            </Grid2>
                        ))}
                    
                    </Grid2>
                    <Button  onClick={handleOpen} sx={{color: 'secondary.light', textTransform: 'capitalize'}}>
                        + Add New Journal
                    </Button>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={style}>
                            <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                <Typography mb={1} id="modal-modal-title" variant="h6" component="h2" >
                                    Add New Journal
                                </Typography>
                                <Typography sx={{fontWeight: 'bold', cursor: 'pointer'}} onClick={handleClose}>X</Typography>
                            </Box>
                            <CustomTextField onChange={(ele) => setNewJournal(ele.target.value)} size={'small'} fullWidth  id="outlined-basic" placeholder="Journal" variant="outlined" /><br/>
                            <Button onClick={() => addNewJournal(newJournal)} sx={{mt:2 }}variant='contained'>Add Journal</Button>
                        </Box>
                    </Modal>
                </Box>

                <Box mb={3}>
                    <Typography mb={1} >Notes for Research Assistant</Typography>
                    <CustomTextField
                        placeholder="Comments"
                        multiline
                        rows={5}
                        value={notesForAssistant}
                        onChange={(ele) => setNotesForAssistant(ele.target.value)}
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

                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type="submit" sx={{color: 'white', textTransform: 'capitalize', marginLeft: 'auto', background: '#1b6d5c'}} variant="contained">
                        { loading ? 'Loading' : '+ Start Research' }
                    </Button>
                </Box>
            </Box>

        </form>
    )
}

export default ResearchForm;
