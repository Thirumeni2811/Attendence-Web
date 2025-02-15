import React from 'react';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Dummy from './Dummy';
import Fake from './Fake';

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
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
});

export default function Dashboard() {
  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          {/* Outlet for Nested Routes */}
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
