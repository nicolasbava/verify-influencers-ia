import { styled, TextField } from "@mui/material";

export const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#101827', // Fondo
      border: '1px solid #80808078', // Borde
      borderRadius: '9px',
      color: 'white' // Bordes redondeados
    },
});
