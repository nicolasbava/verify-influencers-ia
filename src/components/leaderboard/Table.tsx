import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, styled } from '@mui/material';
import theme from '../../theme';
import { formatRevenue, getStatusColor } from '../../utils';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import { HealthInfluencerVerified } from '../../interfaces/Research';
import { useNavigate } from 'react-router-dom'; // For redirection
import { useResearchContext } from '../../context/GlobalContext';
import MovingIcon from '@mui/icons-material/Moving';
export interface Influencer {
    name: string;
    totalTrustPercentage: number;
    category: string;
    trustScore: string;
    trend: string;
    followers: string;
    verifiedClaims: number;
}

const ButtonGreen = styled(Button)(() => ({
    padding: '4px 12px',
    textTransform: 'capitalize',
    borderRadius: '25px',
    background: '#0ea06f',
    color: 'white'
}));

const TableCellCustom = styled(TableCell)(() => ({
    fontSize: '12px',
    color: 'white',
    borderBottom: '2px solid #80808075',
    textTransform: 'uppercase'
}));

const TableCellCustomInfo = styled(TableCell)(() => ({
    fontSize: '14px',
    color: 'white',
    borderBottom: '2px solid #80808075',
    textTransform: 'capitalize'
}));

export default function BasicTable({ data }: { data: HealthInfluencerVerified[] }) {
    const { setResearchResponse } = useResearchContext();
    const navigate = useNavigate();

    const handleRowClick = (row: HealthInfluencerVerified) => {
        setResearchResponse({} as HealthInfluencerVerified);
        setResearchResponse(row);
        navigate('/detail');
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ButtonGreen>All</ButtonGreen>
                </Box>
                <Button
                    variant='contained'
                    sx={{ color: 'white', textTransform: 'capitalize', borderRadius: '9px' }}
                    startIcon={<SyncAltOutlinedIcon sx={{ transform: 'rotate(90deg)' }} />}
                >
                    Highest first
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: '14px 14px 9px 9px' }}>
                <Table sx={{ minWidth: 650, background: theme.palette.primary.light, color: 'white', border: '2px solid #80808075' }} aria-label="simple table">
                    <TableHead sx={{ background: '#1d2839' }}>
                        <TableRow sx={{ color: '#ffffffa1' }}>
                            <TableCellCustom>Rank</TableCellCustom>
                            <TableCellCustom>Influencer</TableCellCustom>
                            <TableCellCustom>Category</TableCellCustom>
                            <TableCellCustom>Trust Score</TableCellCustom>
                            <TableCellCustom>Trend</TableCellCustom>
                            <TableCellCustom>Followers</TableCellCustom>
                            <TableCellCustom>Verified Claims</TableCellCustom>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: HealthInfluencerVerified, key: number) => (
                            <TableRow
                                key={row.name + key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => handleRowClick(row)} // Trigger the click handler
                            >
                                <TableCellCustomInfo component="th" scope="row">
                                    #{key + 1}
                                </TableCellCustomInfo>
                                <TableCellCustomInfo sx={{cursor: 'pointer'}}>{row.name}</TableCellCustomInfo>
                                <TableCellCustomInfo>{row.category}</TableCellCustomInfo>
                                <TableCellCustomInfo sx={{ fontWeight: 'bold', color: getStatusColor(Number(row.totalTrustPercentage)) }}>
                                    {row.totalTrustPercentage}%
                                </TableCellCustomInfo>
                                <TableCellCustomInfo><MovingIcon sx={{color: Math.random() % 2 === 0 ? 'red' : 'secondary.light'}} /></TableCellCustomInfo>
                                <TableCellCustomInfo>{formatRevenue(row.qFollowers)}+</TableCellCustomInfo>
                                <TableCellCustomInfo>241</TableCellCustomInfo>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ background: 'primary.dark', height: '30vh', width: '100%' }}></Box>
        </>
    );
}
