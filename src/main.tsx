import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.ts";
import { ResearchProvider } from './context/GlobalContext.tsx';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ResearchProvider>
        <ThemeProvider theme={theme}>   
          <CssBaseline />
              <App />
        </ThemeProvider>
      </ResearchProvider>
    </BrowserRouter>
  </StrictMode>,
)
