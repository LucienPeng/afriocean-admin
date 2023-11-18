import { Divider, Drawer, List, styled } from '@mui/material';
import { secondaryListItems, useGetNavItems } from './listItems';

const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    position: 'static',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export const SideBar = () => {
  const { mainListItems } = useGetNavItems();
  return (
    <StyledDrawer variant="permanent">
      <DrawerHeader />
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
      </List>
    </StyledDrawer>
  );
};
