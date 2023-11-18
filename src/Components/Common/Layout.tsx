import { ReactNode } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Navbar } from './Navbar';
import { DrawerHeader, SideBar } from './SideBar/SideBar';

export const Layout = (props: { children: ReactNode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <SideBar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          overflow: 'auto',
          flexGrow: 1,
          minHeight: '100vh',
        }}
      >
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
};
