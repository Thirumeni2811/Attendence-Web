import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, MenuItem, Avatar, Menu, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../assets/images/Logo.svg";
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Mode from '../components/Theme/Mode'
import Sidebar from '../constants/Sidebar';
import { useTheme } from '../components/Theme/ThemeContext';
import axios from 'axios';
import { CONFIG, GET_ORGANISATION } from '../services';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [selected, setSelected] = useState("Department")
  const [selectedChildId, setSelectedChildId] = useState('');
  const [data, setData] = useState({});
  // console.log(data)

  const [sidebarToggle, setSidebarToggle] = useState(true); // Initially true (Sidebar is visible)

  // Function to toggle sidebar
  const handleSidebarToggle = () => {
    setSidebarToggle((prev) => !prev); // Toggle between true & false
  };

  const isMdScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm', 'md', 'lg')); //md and lg
  const drawerWidth = sidebarToggle ? (isMdScreen ? 280 : 367.5) : 0;
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const savedSelected = sessionStorage.getItem('selectedMenu');
    const savedSelectedChild = sessionStorage.getItem('selectedChildMenu');

    if (token) {
      // Restore the saved menu and child list from localStorage
      if (savedSelected) {
        setSelected(savedSelected);
        setOpenAccordionId(savedSelected);

        // Restore child selection if any
        if (savedSelectedChild) {
          setSelectedChildId(savedSelectedChild);
        }
      } else {
        // Default selection if no saved data
        setSelected('Department');
      }
    } else {
      // Navigate to login if token doesn't exist
      navigate('/login');
    }
  }, [navigate]);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    console.log("User logged out");
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessTokenExpires');
    sessionStorage.removeItem('refreshTokenExpires');
    sessionStorage.removeItem('selectedMenu');
    sessionStorage.removeItem('selectedChildMenu');
    navigate('/');
  };


  const drawer = (
    <Sidebar selected={selected} setSelected={setSelected} selectedChildId={selectedChildId} setSelectedChildId={setSelectedChildId} data={data}/>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const { mode } = useTheme();

  const getData = async () => {
    try {
      const response = await axios.get(GET_ORGANISATION, CONFIG);
      const data = response?.data?.data
      setData(data || {})
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: mode === 'dark' ? '#151513' : 'white',
            color: '#121312',
            borderBottom: `1px solid ${mode === 'dark' ? '#323232' : '#c0c0c0'}`,
            boxShadow: 'none',
          }}
        >
          <Toolbar className='flex justify-between'>
            {/* Mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: 'none' },
                color: mode === 'dark' ? '#F3F5F7' : '#151513'
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* Laptop */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleSidebarToggle}
              sx={{
                display: { xs: 'none', md: 'block' },
                color: mode === 'dark' ? '#F3F5F7' : '#151513'
              }}
            >
              <MenuIcon />
            </IconButton>


            <div className={`p-2 ${sidebarToggle ? 'block' : 'hidden'}`}>
              <img src={Logo} alt="Logo" className="lg:hidden" />
            </div>

            {!sidebarToggle && (
              <div className="p-2 absolute lg:relative">
                <img src={Logo} alt="Logo" className="hidden lg:block lg:shrink-0" />
              </div>
            )}

            <div className='flex items-center gap-2'>
              <Mode />
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={data.name || "Attendance"} src={data.logo || "/static/images/avatar/2.jpg"} />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={logOut}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </div>

          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* Mobile */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          {/* laptop */}
          {
            sidebarToggle &&
            <Drawer
              className='dark:bg-black'
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  borderRight: `1px solid ${mode === 'dark' ? '#323232' : '#c0c0c0'}`
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          }
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
          className='dark:bg-black min-h-dvh h-auto'
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
