import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.ts";
import { ResearchProvider } from './context/GlobalContext.tsx';

// TODO put links of claim research and date of claim publish and profile picture -> save picture to bdd
// TODO add categories to the health influencer for detail page 
// TODO add total claims verified for info boxes 
// TODO add filters to detail page
// TODO color to percentage temperature
// TODO get trust percentage
// TODO save to context the data
// TODO revisar que elimine los duplicados de claims que tienen el mismo significado (?
// TODO add input to allow client put his own api key
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResearchProvider>
      <ThemeProvider theme={theme}>   
        <CssBaseline />
            <App />
      </ThemeProvider>
    </ResearchProvider>
  </StrictMode>,
)
