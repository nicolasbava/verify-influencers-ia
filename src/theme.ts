import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#17212f',
      dark: '#101827',
      light: '#17212f'
    },
    secondary: {
      main: "#12b981",
      dark: '#173439'
    },
    common: {
      white: "#ffffff", // Global white color
    },
    grey: {
      "300": "#ffffff24"
    }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    allVariants: {
      color: "#ffffff", // Set font color to white globally
    },
  },
  
});

export default theme;
