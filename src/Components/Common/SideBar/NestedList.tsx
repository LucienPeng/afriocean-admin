import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NestedNavItem } from './useGetNavItems';

export const NestedLisItem = (props: { navItem: NestedNavItem }) => {
  const [open, setOpen] = useState(true);
  const { navItem } = props;
  const navigate = useNavigate();
  const redirectHandler = (path: string) => navigate(path);
  const clickHandler = () => {
    if (navItem.subNavItem && navItem.path === '#') {
      setOpen(!open);
    } else {
      redirectHandler(navItem.path);
    }
  };
  return (
    <List>
      <ListItemButton onClick={clickHandler}>
        <ListItemIcon>{navItem.icon}</ListItemIcon>
        <ListItemText primary={navItem.navTitle} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {navItem.subNavItem.map((subNav) => (
            <ListItem key={subNav.navTitle} sx={{ pl: 4 }} onClick={() => redirectHandler(subNav.path)}>
              <ListItemText primary={subNav.navTitle} sx={{ fontSize: '10px' }} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};
