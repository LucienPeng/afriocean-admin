import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SingleNavItem } from './useGetNavItems';
import { useNavigate } from 'react-router';

export const SingleListItem = (props: { navItem: SingleNavItem; isDisabled?: boolean }) => {
  const { navItem, isDisabled } = props;
  const navigate = useNavigate();
  return (
    <ListItemButton onClick={() => navigate(navItem.path)} disabled={isDisabled}>
      <ListItemIcon>{navItem.icon}</ListItemIcon>
      <ListItemText primary={navItem.navTitle} />
    </ListItemButton>
  );
};
