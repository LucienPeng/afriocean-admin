import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SingleNavItem } from './useGetNavItems';
import { useNavigate } from 'react-router';

export const SingleItem = (props: { navItem: SingleNavItem }) => {
  const { navItem } = props;
  const navigate = useNavigate();
  return (
    <ListItemButton onClick={() => navigate(navItem.path)}>
      <ListItemIcon>{navItem.icon}</ListItemIcon>
      <ListItemText primary={navItem.navTitle} />
    </ListItemButton>
  );
};
