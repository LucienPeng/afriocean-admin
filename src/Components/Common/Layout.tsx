import { Box, CssBaseline, Divider, Drawer, List, Toolbar, styled } from '@mui/material';
import { mainListItems, secondaryListItems } from '../Dashboard/listItems';
import { Navbar } from './Navbar';
import { ReactNode } from 'react';

const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    position: 'static',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  },
});

export const Layout = (props: { children: ReactNode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <StyledDrawer variant="permanent">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        ></Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </StyledDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};
