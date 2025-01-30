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
    const [influencerData, setInfluencerData] = useState<HealthInfluencerVerified | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredClaims, setFilteredClaims] = useState<Claim[]>([]);
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
                    filteredClaims && filteredClaims.length > 0 ? (
                        filteredClaims.map((ele, key) => (
                                <ClaimDetail key={key} claim={ele} />
                            )
                        )
                    ) : 'Loading'
                }

                {
                    influencerData?.claims.length === 0 && 'No claims found'
                }


                {JSON.stringify(influencerData?.claims)}
                
            </Box>
        </Box>
    )
}

export default ClaimsTab;