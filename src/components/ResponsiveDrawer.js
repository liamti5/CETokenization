import * as React from 'react';
import { useState, useEffect } from 'react';
import useWeb3 from '../hooks/useWeb3';
import { useEthereumAddress } from '../contexts/EthereumAddressContext';
import styles from '../styles/CompanyBox.module.css';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import GetAppIcon from '@mui/icons-material/GetApp';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import abi from '../contracts/abi.json';
import BurnMint from './Raise';
import Offering from './Recovery';
import Pause from '../components/Pause';
import ChangePrice from './Destroy';
import Withdraw from '../components/Withdraw';
import Announcement from './ChangeDeputy';
import PayDividends from './Transfer';
import TransferFrom from './TransferFrom';
import Approve from './Approve';
import MoneyIcon from '@mui/icons-material/Money';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [selectedOption, setSelectedOption] = useState('Raise');

  const iconMap = {
    'Raise': <MoneyIcon />,
    'Destroy': <WhatshotIcon />,
    'Pause/Unpause': <PauseIcon />,
    'Transfer': <PlayArrowIcon />,
    'Recovery': <ChangeCircleIcon />,
    'Transfer': <SendIcon />,
    'Approve': <HowToRegIcon />,
    'Transfer from': <FileUploadIcon />,
    'Change Deputy': <SwitchAccountIcon />,
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Raise', 'Pause/Unpause', 'Transfer', 'Approve', 'Transfer from', 'Recovery', 'Destroy', 'Change Deputy'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => {
              setSelectedOption(text);
            }}>
              <ListItemIcon sx={{ color: 'white' }}>
                {iconMap[text]}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;
  
  const { web3, account, contract } = useWeb3();

  const renderComponent = () => {
    switch (selectedOption) {
      case 'Raise':
        return <BurnMint web3={web3} account={account} contract={contract} />;
      case 'Pause/Unpause':
        return <Pause web3={web3} account={account} contract={contract} />;
      case 'Pause/Unpause':
        return <Pause web3={web3} account={account} contract={contract} />;
      case 'Recovery':
        return <Offering web3={web3} account={account} contract={contract} />;
      case 'Destroy':
        return <ChangePrice web3={web3} account={account} contract={contract} />;
      case 'Transfer':
        return <PayDividends web3={web3} account={account} contract={contract} />;
      case 'Approve':
        return <Approve web3={web3} account={account} contract={contract} />;
      case 'Transfer from':
        return <TransferFrom web3={web3} account={account} contract={contract} />;
      case 'Change Deputy':
        return <Announcement web3={web3} account={account} contract={contract} />;
      default:
      return null;
    }
  };
  

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'black'},
        
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'black', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px', },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
          <DisplaySettingsIcon sx={{ color: 'white' }} />
        </IconButton>
        <Toolbar />
        {web3 && account && contract && renderComponent()}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;