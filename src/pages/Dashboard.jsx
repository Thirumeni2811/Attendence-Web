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

const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dummy', title: 'Dashboard', icon: <DashboardIcon /> },
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
    primary: {
      main: '#007BFF', // Change this to your preferred main color
    },
    secondary: {
      main: '#FF5722', // Change this as needed
    },
  },
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
});

export default function Dashboard() {
  const navigate = useNavigate();

  // ✅ Make sure session contains "user" object
  const [session, setSession] = useState({
    user: {
      name: 'Thirumeni',
      email: 'thirumeni948@gmail.com',
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

  // const getData = () => {
  //   try {
  //     const response = "1234"
  //     setSession(response)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'MUI',
        // title: <span style={{ color: '#008000', fontWeight: 'bold' }}>Dashboard</span>,
        homeUrl: '/toolpad/core/introduction',
      }}
      session={session} // ✅ Ensures user is already signed in
      authentication={{ signOut: logOut }} // ✅ No sign-in needed
    >
      <DashboardLayout>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
