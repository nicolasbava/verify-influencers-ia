import { Box, Button, styled, TextField } from "@mui/material";

const BORDER_BOX = '#41c79a6b';
const BORDER_BOX_INACTIVE = '#80808042';

export const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#101827', // Fondo
      border: '1px solid #80808078', // Borde
      borderRadius: '9px',
      color: 'white' // Bordes redondeados
    },
});

export const StyledButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
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

export const StyledBox = styled(Box)(({ theme }) => ({
  border: `2px solid #ffffff24`,
  padding: '24px',
  borderRadius: '9px',
  background: theme.palette.primary.light
}));
