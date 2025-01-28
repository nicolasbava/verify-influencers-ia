import { Box, Button, FormControlLabel, Grid2, Switch, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { IOSSwitch } from "../../utils/iosSwitch";
import { fetchDataFromIA } from "../../api/perplexityApi";

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
    // marginRight: 8,
    cursor: 'pointer',
    textTransform: 'capitalize',
    width: '-webkit-fill-available',
}));


const StyledBox = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.secondary.dark,
    border: active ? `1px solid ${BORDER_BOX_GREY}` :`1px solid ${BORDER_BOX}`,
    // color: active ? theme.palette.primary.contrastText : theme.palette.secondary.main,
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

const generateSystemMessage = (includeRevenueAnalysis: boolean, timeRange: TimeRange): string => {
    const basePrompt =
        "You are an AI that searches health claims in tweets and podcast transcripts of health influencers. Provide the result in JSON format with the following structure: { name, biography (max 75 words), claims (array of strings), qFollowers: (number total followers in all social media, optional)";

    const revenuePrompt = includeRevenueAnalysis
        ? ", yearlyRevenue: (number in USD, optional)"
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

    return `${basePrompt}${revenuePrompt} }.${timeRangePrompt} Focus on extracting health-related claims. Example claim: 'Viewing sunlight within 30-60 minutes of waking enhances cortisol release'. Return only the JSON output and nothing else.`;
};



const ResearchForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("");
    const [responses, setResponses] = useState([]);
    const [qProducts, setQProducts] = useState<number>(15);
    const [messages, setMessages] = useState([
        {
            role: "system",
            content: "",
        },
    ]); 
    const [newResearch, setNewResearch] = useState<boolean>(false);
    const [includeRevenueAnalysis, setIncludeRevenueAnalisys] = useState<boolean>(false);
    const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LAST_WEEK);
    
    const [journals, setJournals] = useState([
        {name: 'PubMed Central', selected: true}, 
        {name: 'Nature', selected: true}, 
        {name: 'Science', selected: true}, 
        {name: 'Cell', selected: true}
    ])

        
    const handleSend = async () => {
        if (!userInput.trim()) return;

        const updatedMessages = [
            ...messages,
            { role: "user", content: userInput },
        ];
        setMessages(updatedMessages);
        setLoading(true);

        try {
            const result = await fetchDataFromIA(updatedMessages);
            setResponses((prev) => [...prev, result.choices[0].message.content]);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: result.choices[0].message.content },
            ]);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            setUserInput("");
        }
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeRevenueAnalisys(event.target.checked);
    };

    useEffect(() => {
        const newMessage = {
            role: "system",
            content: generateSystemMessage(includeRevenueAnalysis, timeRange),
        };

        setMessages([newMessage]);
    }, [includeRevenueAnalysis, timeRange]);


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSend();
                // redirect()
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
                                <Typography variant="body1" sx={{opacity: '0.6'}}>Research a known health influencer by name</Typography>
                            </StyledBox>
                        </Grid2>
                        <Grid2 size={6}>
                            <StyledBox active={!newResearch} onClick={() => setNewResearch(true)}>
                                <Typography sx={{fontWeight: 'bold', fontSize: '18px'}}>Discover New</Typography>
                                <Typography variant="body1" sx={{opacity: '0.6'}}>Find and analyze new health influencers</Typography>
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
                                    <StyledButton active={timeRange === TimeRange.LAST_WEEK}  onClick={() => setTimeRange(TimeRange.LAST_WEEK)} >Last Week</StyledButton>
                                </Grid2>
                                <Grid2 size={6}>
                                    <StyledButton active={timeRange === TimeRange.LAST_MONTH}   onClick={() => setTimeRange(TimeRange.LAST_MONTH)}>Last Month</StyledButton>
                                </Grid2>
                                <Grid2 size={6}>
                                    <StyledButton active={timeRange === TimeRange.LAST_YEAR}   onClick={() => setTimeRange(TimeRange.LAST_YEAR)}>Last Year</StyledButton>
                                </Grid2>
                                <Grid2 size={6}>
                                    <StyledButton active={timeRange === TimeRange.ALL_TIME}   onClick={() => setTimeRange(TimeRange.ALL_TIME)}>All Time</StyledButton>
                                </Grid2>
                            </Grid2>
                        </Box>
                        <Box mb={3}>
                            <Typography mb={1}>Influencer Name</Typography>
                            <TextField 
                                size={'small'} 
                                id="outlined-basic" 
                                label="Outlined" 
                                variant="outlined" 
                                onChange={(ele) => {
                                    setUserInput(ele.target.value)
                                }} 
                            />
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
                    <Button  type="submit" sx={{color: 'secondary.light', textTransform: 'capitalize', marginLeft: 'auto'}} variant="contained">
                        { loading ? 'Loading' : '+ Start Research' }
                    </Button>
                </Box>
            </Box>
        </form>
    )
}

export default ResearchForm;