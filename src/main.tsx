import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.ts";
import { ResearchProvider } from './context/GlobalContext.tsx';
import { BrowserRouter } from 'react-router-dom';

// TODO add input to allow client put his own api key
// TODO put links of claim research and date of claim publish and profile picture -> save picture to bdd READY
// TODO add filters to detail page READY
// TODO revisar que elimine los duplicados de claims que tienen el mismo significado (? READY
// TODO add categories to the health influencer for detail page _!READY
// TODO add total claims verified for info boxes _!READY
// TODO color to percentage temperature _!READY
// TODO get trust percentage _!READY
// TODO save to context the data _!READY
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
