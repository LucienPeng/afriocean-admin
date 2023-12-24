import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NestedNavItem } from './useGetNavItems';

export const NestedLisItem = (props: { navItem: NestedNavItem; isDisabled?: boolean }) => {
  const { navItem, isDisabled } = props;
  const [open, setOpen] = useState(false);
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
      <ListItemButton onClick={clickHandler} disabled={isDisabled}>
        <ListItemIcon>{navItem.icon}</ListItemIcon>
        <ListItemText primary={navItem.navTitle} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {navItem.subNavItem.map((subNav) => (
            <ListItemButton
              key={subNav.navTitle}
              sx={{ pl: 4 }}
              onClick={() => redirectHandler(subNav.path)}
              disabled={isDisabled}
            >
              <ListItemText primary={subNav.navTitle} sx={{ fontSize: '10px' }} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};
