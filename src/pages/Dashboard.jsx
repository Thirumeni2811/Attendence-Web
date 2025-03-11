import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import axios from 'axios';
import { CONFIG, GET_ORGANISATION } from '../services';
import Mode from '../components/Theme/Mode'

const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'department', title: 'Department', icon: <DashboardIcon /> },
  { segment: 'designation', title: 'Designation', icon: <DashboardIcon /> },
  { segment: 'fake', title: 'Orders', icon: <ShoppingCartIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      { segment: 'reports/sales', title: 'Sales', icon: <DescriptionIcon /> },
      { segment: 'reports/traffic', title: 'Traffic', icon: <DescriptionIcon /> },
    ],
  },
  { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];

const demoTheme = extendTheme({
  palette: {
    mode: 'light', // Default mode
    primary: {
      main: '#007BFF',
    },
    secondary: {
      main: '#FF5722',
    },
    background: {
      default: '#FFFFFF', 
      paper: '#F5F5F5',
    },
    text: {
      primary: '#151513', 
    },
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#FFFFFF',
          paper: '#F5F5F5',
        },
        text: {
          primary: '#151513', // Darker text for light mode
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#151513', // Dark mode background
          paper: '#1E1E1E',
        },
        text: {
          primary: '#808080', // Light text for dark mode
        },
      },
    },
  },
  colorSchemeSelector: 'class',
});


export default function Dashboard() {
  const navigate = useNavigate();

  // ✅ Make sure session contains "user" object
  const [session, setSession] = useState({
    user: {
      name: 'Attendence',
      email: 'attendence@gmail.com',
      role: 'Admin',
      image: 'https://avatars.githubusercontent.com/u/19550456'
    },
  });

  const logOut = () => {
    console.log('User logged out');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessTokenExpires');
    sessionStorage.removeItem('refreshTokenExpires');
    setSession(null); // Clear session on logout
    navigate('/');
  };

  const getData = async () => {
    try {
      const response = await axios.get(GET_ORGANISATION, CONFIG);
      const data = response?.data?.data
      const users = {
        user: {
          name: data?.name,
          email: data?.owner?.email,
          role: data?.owner?.role,
          image: data?.logo
        }
      }
      setSession(users)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: <img src={session.user.image} loading="lazy" alt="Logo" />,
        title: <span style={{ color: '#008000', fontWeight: 'bold' }}>{session.user.name}</span>,
        homeUrl: '/department',
      }}
      session={session} // ✅ Ensures user is already signed in
      authentication={{ signOut: logOut }} // ✅ No sign-in needed
    >
      <DashboardLayout
        slots={{
          toolbarActions: Mode, // ✅ Mode component added to the toolbar
        }}
      >
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
