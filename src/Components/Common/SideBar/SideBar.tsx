import { Drawer, styled } from '@mui/material';
import { useGetNavItems } from './useGetNavItems';
import { useUserRedux } from '../../../useUserRedux';
import { Roles } from '../../../model/company.model';

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
      {role === Roles.ADMIN ? adminListItems : userListItems}
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
      {role === Roles.ADMIN ? adminListItems : userListItems}
    </Drawer>
  );
};
