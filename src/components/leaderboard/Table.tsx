import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, styled } from '@mui/material';
import theme from '../../theme';

export interface Influencer {
    rank: number;
    name: string;
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
    // padding: '4px 12px',
    // textTransform: 'capitalize',
    // borderRadius: '25px',
    // background: '#0ea06f',
    textTransform: 'uppercase',

    color: 'white'
}));

const TableCellHeadCustom = styled(TableCell)(() => ({
    // padding: '4px 12px',
    // textTransform: 'capitalize',
    // borderRadius: '25px',
    // background: '#0ea06f',
    color: 'white'
}));

export default function BasicTable({data}: {data : Influencer[]}) {
  return (
    <>
        <Box sx={{display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center', }}>
                <ButtonGreen>All</ButtonGreen>
            </Box>
            <Button variant='contained' sx={{color: 'white'}}>Highest first</Button>
        </Box>
   
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, background: theme.palette.primary.light, color: 'white', border: '1px solid white', }} aria-label="simple table">
            <TableHead sx={{background: '#1d2839'}}>
                <TableRow sx={{color: '#ffffffa1'}}>
                    <TableCellCustom>Rank</TableCellCustom>
                    <TableCellCustom >Influencer</TableCellCustom>
                    <TableCellCustom >Category</TableCellCustom>
                    <TableCellCustom >Trust Score</TableCellCustom>
                    <TableCellCustom >Trend</TableCellCustom>
                    <TableCellCustom >Followers</TableCellCustom>
                    <TableCellCustom >Verified Claims</TableCellCustom>
                </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row : Influencer) => (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCellCustom component="th" scope="row">
                        #{row.rank}
                    </TableCellCustom>
                    <TableCellCustom>{row.name}</TableCellCustom>
                    <TableCellCustom>{row.category}</TableCellCustom>
                    <TableCellCustom>{row.trustScore}</TableCellCustom>
                    <TableCellCustom>{row.trend}</TableCellCustom>
                    <TableCellCustom>{row.followers}</TableCellCustom>
                    <TableCellCustom>{row.verifiedClaims}</TableCellCustom>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}