import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { Modal } from '@mui/material';
import { CustomTextField } from '../styled';
import { useResearchContext } from '../../context/GlobalContext';
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactNode;
}


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        color: 'white',
        bgcolor: 'primary.light',
        border: '1px solid grey',
        borderRadius: '15px',
        boxShadow: 24,
        p: 4,
    };

const drawerWidth = 240;
const navItems = ['Leaderboard', 'Research'];

export default function DrawerAppBar(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [apiKey, setApiKey] = React.useState<string>('')
  const {setAPIKey} = useResearchContext()

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VerifyInfluencers
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, key) => (
          <ListItem key={item + key} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const designateAPIKey = () => {
    if (!apiKey.trim()) {
      alert("Please enter a valid API key.");
      return;
    }
  
    setAPIKey(apiKey); // Update context with API key
    setApiKey(""); // Clear input after submission
    handleClose(); // Close modal
  };

  return (
    <Box sx={{ display: 'flex',  }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <ShieldOutlinedIcon sx={{mr: 1, fontSize: '33px'}} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontSize: '20px' }}
          >
            VerifyInfluencers
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, key) => (
              <Link key={key + item} to={`/${item.toLowerCase()}`}>
                <Button key={item} sx={{ color: '#fff', textTransform: 'capitalize', fontSize: '16px' }}>
                    {item}
                </Button>
              </Link>
            ))}
            <Button onClick={  handleOpen} sx={{ color: '#fff', textTransform: 'capitalize', fontSize: '16px' }}>
                    API Key
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                        <Typography  id="modal-modal-title" variant="h6" component="h2" >
                            Add Your Perplexity API Key
                        </Typography>
                        <Typography sx={{fontWeight: 'bold', cursor: 'pointer'}} onClick={handleClose}>X</Typography>
                    </Box>
                    <CustomTextField onChange={(e) => setApiKey(e.target.value)} value={apiKey}  size={'small'} fullWidth  id="outlined-basic" placeholder="API Key" variant="outlined" /><br/>
                    <Button onClick={designateAPIKey}  sx={{mt:2 }} variant='contained'>Add API Key</Button>
                </Box>
            </Modal>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3,margin: 'auto'}}>
        <Toolbar />
        <Box pt={2} >
          {children}
        </Box>
      </Box>
    </Box>
  );
}