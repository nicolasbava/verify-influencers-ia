import { Box, Divider, styled, Typography } from "@mui/material";
import { Claim } from "../../../interfaces/Research";
import { getStatusColor } from "../../../utils";
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { Link } from "react-router-dom";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
interface ClaimDetailProps {
    claim: Claim;
}

const TypographyCustom = styled(Typography)<{ status: string }>(({ theme, status }) => ({
    padding: '4px 12px',
    borderRadius: '29px',
    textTransform: 'lowercase',
    opacity: '0.9',
    fontSize: '14px',
    color: 
      status === 'Verified' 
        ? '#32ce96' 
        : status === 'Questionable'
        ? '#e3a744' 
        : status === 'Debunked'
        ? '#db857e'
        : theme.palette.primary.dark, 
    background: 
      status === 'Verified' 
        ? '#133d3b' 
        : status === 'Questionable'
        ? '#51360e' 
        : status === 'Debunked'
        ? '#6b1e18'
        : theme.palette.primary.dark, 
}));

const StatusTypography = styled(Typography)<{ trustStatus: number }>(({ trustStatus }) => ({
    fontSize: '25px',
    color: getStatusColor(trustStatus) ?? 'white',
    fontWeight: 'bold', 
    lineHeight: 1,

}));


const ImgIcon = styled('img')(() => ({
    width: '19px',
    height: 'auto',

}));

const ClaimDetail = ({ claim }: ClaimDetailProps) => {
    // const [sortBy, setSortBy] = useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setSortBy(event.target.value as string);
    // };

    return (
        <Box my={4}>
            <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb:1,}}>
                <Box  sx={{display: 'flex', alignItems: 'center',}}>
                    <Box sx={{background: '#ffffff26', width: '23px', borderRadius: '25px', height: '10px', mr: 2, opacity: '0.3'}}></Box>
                    <TypographyCustom status={claim.status}>{claim.status}</TypographyCustom>
                    <Box display={'flex'} alignItems={'center'} gap={1} sx={{ml: 2}}>
                        <CalendarTodayOutlinedIcon sx={{color:'grey', fontSize: '18px'}} />
                        <Typography sx={{color: 'grey', mt: '3px', fontSize: '13px', fontWeight: 'bold'}}>{claim.date}</Typography>
                    </Box>
                </Box>
                <Box sx={{textAlign: 'right'}} >
                    <StatusTypography trustStatus={claim.trustScore} >{claim.trustScore}%</StatusTypography>
                    <Typography variant='caption' sx={{opacity: '0.6'}} >Trust Score</Typography>
                </Box>
            </Box>

            <Box mt={-2} mb={4}>
                <Box  mb={2}>
                    <Typography mb={1} sx={{fontWeight: 'bold', fontSize: '18px', maxWidth: '80%'}} >{claim.text}</Typography>
                    <Link to='/' target="_blank">
                        <Link to={claim.url} target={'_blank'}>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Typography sx={{color: 'secondary.light'}} >View source </Typography>
                                    <OpenInNewOutlinedIcon sx={{fontSize: '15px', color: 'secondary.light', ml: 1, mt:'2px'}} />
                            </Box>
                        </Link>
                    </Link>
                </Box>
                <Box ml={4} mb={4}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                        <ImgIcon
                            src="assets/brain.png"
                            alt="Example"
                            loading="lazy"
                        />
                        <Typography sx={{fontWeight: 'bold'}} >AI Analisys</Typography>
                    </Box>
                    <Typography  mb={1} sx={{color: '#ffffff80', maxWidth: '60%'}} >{claim.resume}</Typography>
                    <Link to={claim.verifyLinkReference} target='_blank'>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: 'secondary.light'}}>View Research</Typography>
                            <OpenInNewOutlinedIcon sx={{fontSize: '15px', color: 'secondary.light', ml: 1, }} />
                        </Box>
                    </Link>
                </Box>
            </Box>

            <Divider sx={{background: 'grey'}} />
        </Box>
    )
}

export default ClaimDetail;