import { Divider, Drawer, List, styled } from '@mui/material';
import { useGetNavItems } from './useGetNavItems';
import { useUserRedux } from '../../../useUserRedux';
import { Roles } from '../../../model/compan.model';

const DRAWER_WIDTH = 250;

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

export const MobileSideBar = (props: { open: boolean; setIsOpen: (isOpen: boolean) => void }) => {
  const { open, setIsOpen } = props;
  const { userListItems, adminListItems } = useGetNavItems();
  const { role } = useUserRedux();

  return (
    <Drawer anchor="left" open={open} onClose={() => setIsOpen(false)}>
      <DrawerHeader />
      <List component="nav">
        {userListItems}
        <Divider sx={{ my: 1 }} />
        {role === Roles.ADMIN && adminListItems}
      </List>
    </Drawer>
  );
};
