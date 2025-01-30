import { Box, Button, FormControl, Grid2, InputAdornment, MenuItem, Select, SelectChangeEvent, styled, Typography } from "@mui/material";
import ClaimDetail from "./ClaimDetail";
import SearchIcon from "@mui/icons-material/Search";
import { useResearchContext } from "../../../context/GlobalContext";
import { useEffect, useState } from "react";
import { Claim, HealthInfluencerVerified } from "../../../interfaces/Research";
import { CustomTextField } from "../../styled";
import theme from "../../../theme";

const ButtonGreen = styled(Button)<{active: boolean}>(({active}) => ({
    padding: '4px 12px',
    textTransform: 'capitalize',
    borderRadius: '25px',
    backgroundColor: active ? theme.palette.secondary.light : theme.palette.primary.dark,
    border: active ? `1px solid #0ea06f` :`1px solid grey`,
}));

const ButtonGreenSquared = styled(Button)<{active: boolean}>(({theme, active}) => ({
    padding: '4px 12px',
    textTransform: 'capitalize',
    borderRadius: '5px',
    background: active ? '#0ea06f' : theme.palette.primary.dark,
    width: '-webkit-fill-available'
}));

interface Category {
    name: string,
    selected: boolean
}

interface Status {
    name: string,
    selected: boolean
}

const ClaimsTab = () => {
    const { researchResponse } = useResearchContext();
    const [influencerData, setInfluencerData] = useState<HealthInfluencerVerified | null>({
        "id": "huberman_2024_01",
        "name": "Andrew Huberman",
        "biography": "Andrew Huberman is a neuroscientist and tenured professor at Stanford University School of Medicine. He hosts the popular Huberman Lab podcast, focusing on neuroscience and science-based tools for everyday life.",
        "qFollowers": 6100000,
        "yearlyRevenue": 5000000,
        "claims": [
          {
            "id": "39b5477c-1d6e-4433-a098-53a16cc6212c",
            "text": "Cheating in relationships can have negative impacts on mental and physical health.",
            "trustScore": 80,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5709195/",
            "category": "Mental Health",
            "url": "https://www.youtube.com/watch?v=A-iYi2d4LSs",
            "date": "27-03-2024"
          },
          {
            "id": "31477896-81e6-4300-ac66-3149ef1bd36a",
            "text": "Marijuana use can affect brain function and body processes.",
            "trustScore": 85,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3930618/",
            "category": "Neuroscience",
            "url": "https://www.youtube.com/watch?v=A-iYi2d4LSs",
            "date": "10-05-2024"
          },
          {
            "id": "c371fbc3-13d8-41d9-afa7-68c83a596774",
            "text": "Defining relationships clearly is important for emotional well-being.",
            "trustScore": 70,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6128439/",
            "category": "Psychology",
            "url": "https://www.youtube.com/watch?v=A-iYi2d4LSs",
            "date": "10-05-2024"
          },
          {
            "id": "63432e62-b43c-4515-8c8b-9487beabffde",
            "text": "Human behavior and decision-making are complex and influenced by various factors.",
            "trustScore": 90,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2864000/",
            "category": "Behavioral Science",
            "url": "https://unfilteredonline.com/huberman-on-trial-examining-the-evidence/",
            "date": "15-04-2024"
          },
          {
            "id": "34526d2a-c43f-462f-9c27-8611d3f0508c",
            "text": "Scientific research should be critically examined and not overgeneralized.",
            "trustScore": 95,
            "status": "Verified",
            "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1182327/",
            "category": "Scientific Method",
            "url": "https://unfilteredonline.com/huberman-on-trial-examining-the-evidence/",
            "date": "15-04-2024"
          }
        ]
      })
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredClaims, setFilteredClaims] = useState<Claim[]>([
        {
          id: "39b5477c-1d6e-4433-a098-53a16cc6212c",
          text: "Cheating in relationships can have negative impacts on mental and physical health.",
          trustScore: 80,
          status: "Verified",
          verifyLinkReference: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5709195/",
          category: "Mental Health",
          url: "https://www.youtube.com/watch?v=A-iYi2d4LSs",
          date: "27-03-2024"
        },
        {
          "id": "31477896-81e6-4300-ac66-3149ef1bd36a",
          "text": "Marijuana use can affect brain function and body processes.",
          "trustScore": 85,
          "status": "Verified",
          "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3930618/",
          "category": "Neuroscience",
          "url": "https://www.youtube.com/watch?v=A-iYi2d4LSs",
          "date": "10-05-2024"
        },
        {
          "id": "c371fbc3-13d8-41d9-afa7-68c83a596774",
          "text": "Defining relationships clearly is important for emotional well-being.",
          "trustScore": 70,
          "status": "Verified",
          "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6128439/",
          "category": "Psychology",
          "url": "https://www.youtube.com/watch?v=A-iYi2d4LSs",
          "date": "10-05-2024"
        },
        {
          "id": "63432e62-b43c-4515-8c8b-9487beabffde",
          "text": "Human behavior and decision-making are complex and influenced by various factors.",
          "trustScore": 90,
          "status": "Verified",
          "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2864000/",
          "category": "Behavioral Science",
          "url": "https://unfilteredonline.com/huberman-on-trial-examining-the-evidence/",
          "date": "15-04-2024"
        },
        {
          "id": "34526d2a-c43f-462f-9c27-8611d3f0508c",
          "text": "Scientific research should be critically examined and not overgeneralized.",
          "trustScore": 95,
          "status": "Verified",
          "verifyLinkReference": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1182327/",
          "category": "Scientific Method",
          "url": "https://unfilteredonline.com/huberman-on-trial-examining-the-evidence/",
          "date": "15-04-2024"
        }
      ]);
    const [age, setAge] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([
        {
            name: 'All',
            selected: true
        },
        {
            name: 'Questionable',
            selected: true
        },
        {
            name: 'Verified',
            selected: true
        },
        {
            name: 'Debunked',
            selected: true
        },
    ])

    
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
        
    const isAllCatTrue = () => {
        if(categories && categories.map(ele => ele.selected === true)){
            return true
        }else {
            return false
        }
    }

    const handleCategoryClick = (categoryName: string) => {
        setCategories(prevCategories =>
          prevCategories.map(cat =>
            cat.name === categoryName ? { ...cat, selected: !cat.selected } : cat
          )
        );
    };

    const selectAllCategories = () => {
        setCategories(prevCat => prevCat.map(ele => ({ ...ele, selected: true })));
    };

    const selectAllStatuses = () => {
        setSelectedStatuses(prevStatus => prevStatus.map(ele => ({ ...ele, selected: true })));
    };

    const handleStatusClick = (status: string) => {
        if(status === 'All') return selectAllStatuses()
        setSelectedStatuses(prevStatuses =>
            prevStatuses.map(ele =>
            ele.name === status ? { ...ele, selected: !ele.selected } : ele
          )
        );
    };


    useEffect(() => {
        if(researchResponse){
            setInfluencerData(researchResponse)
        }
        if(researchResponse && researchResponse.categories){
            const processedCategories: Category[] = researchResponse.categories.map(category => ({
                name: category,
                selected: true,
            }));
            setCategories(processedCategories);
        }
    }, [researchResponse])
    

    useEffect(() => {
        if (!influencerData || !influencerData.claims) return;
      
        // Get the selected categories
        const selectedCategories = categories
          .filter(category => category.selected)
          .map(category => category.name);
      
        // Get the selected statuses
        const filteredStatuses = selectedStatuses
          .filter(status => status.selected)
          .map(status => status.name);
      
        // If no categories or statuses are selected, return all claims
        if (selectedCategories.length === 0 && filteredStatuses.length === 0) {
          setFilteredClaims(influencerData.claims);
          return;
        }
      
        // Filter claims by category and status
        const newFilteredClaims = influencerData.claims.filter(claim => {
          const matchesCategory =
            selectedCategories.includes(claim.category) || selectedCategories.includes('All');
          const matchesStatus =
            filteredStatuses.includes(claim.status) || filteredStatuses.includes('All');
      
          return matchesCategory && matchesStatus;
        });
      
        setFilteredClaims(newFilteredClaims);
      }, [categories, influencerData, selectedStatuses]);



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
                                        <SearchIcon sx={{color: 'grey'}} />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />  
                </Box>

                <Box mb={3}>
                    <Typography mb={1}>Categories</Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 1}}>
                        <ButtonGreen active={isAllCatTrue()} onClick={() => selectAllCategories()} variant='contained'>All</ButtonGreen>
                        {categories && categories.map((ele, key) => (
                            <ButtonGreen key={key} onClick={() => handleCategoryClick(ele.name)} active={ele.selected}  variant='contained' value={ele.name}>{ele.name}</ButtonGreen>
                        ))}
                    </Box>
                </Box>

                <Box>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <Typography mb={1}>Verification Status</Typography>
                            <Grid2 container spacing={1}>
                                {selectedStatuses && selectedStatuses.map((ele, key) => 
                                    (
                                        <Grid2 key={key} size={3}>
                                            <ButtonGreenSquared onClick={() => handleStatusClick(ele.name)} active={ele.selected} variant='contained'>{ele.name}</ButtonGreenSquared>
                                        </Grid2>
                                    )
                                )}
                            </Grid2>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography mb={1}>Sort By</Typography>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl sx={{background: 'primary.dark'}} size={'small'} fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        // label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem selected  value={'Date'}>Date</MenuItem>
                                        <MenuItem value={'Trust'}>Twenty</MenuItem>
                                        {/* <MenuItem value={}>Thirty</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
            <Box>
                <Typography sx={{opacity: '0.6', fontSize: '17px'}} mb={2}>Showing {influencerData?.claims.length} claims</Typography>
                {
                    // filteredClaims && filteredClaims.length > 0 ? (
                        influencerData.claims.map((ele, key) => (
                                <ClaimDetail key={key} claim={ele} />
                            )
                        )
                    // ) : 'Loading'
                }

                {
                    influencerData?.claims.length === 0 && 'No claims found'
                }


                {/* {JSON.stringify(influencerData?.claims)} */}
                
            </Box>
        </Box>
    )
}

export default ClaimsTab;
