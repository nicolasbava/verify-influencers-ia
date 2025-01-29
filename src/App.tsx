import { Box } from '@mui/material'
import './App.css'
import DrawerAppBar from './components/layout/Header'
import AppRoutes from './Router'
import theme from './theme'

function App() {

  return (
    <Box sx={{background: theme.palette.primary.dark}}>
        <DrawerAppBar>  
            <AppRoutes />
        </DrawerAppBar>
    </Box>
  )
}

export default App
