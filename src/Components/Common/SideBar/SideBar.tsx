import { Divider, Drawer, List, styled } from '@mui/material';
import { useGetNavItems } from './useGetNavItems';
import { useUserRedux } from '../../../useUserRedux';
import { Roles } from '../../../model/model';

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
  const { userListItems, adminListItems } = useGetNavItems();
  const { role } = useUserRedux();

  return (
    <StyledDrawer variant="permanent">
      <DrawerHeader />
      <List component="nav">
        {userListItems}
        <Divider sx={{ my: 1 }} />
        {role === Roles.ADMIN && adminListItems}
      </List>
    </StyledDrawer>
  );
};
