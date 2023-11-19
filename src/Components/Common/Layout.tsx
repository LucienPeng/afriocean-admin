import { ReactNode, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Navbar } from './Navbar';
import { DrawerHeader, MobileSideBar, SideBar } from './SideBar/SideBar';
import { useDeviceMetadata } from './DeviceMetadataProvider';

export const Layout = (props: { children: ReactNode }) => {
  const { isMobileView } = useDeviceMetadata();
  const [open, setIsOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar setIsOpen={setIsOpen} />
      {isMobileView ? <MobileSideBar open={open} setIsOpen={setIsOpen} /> : <SideBar />}
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
