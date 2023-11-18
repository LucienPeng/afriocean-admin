import { ReactNode } from 'react';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  readonly navTitle: string;
  readonly path: string;
  readonly icon: ReactNode;
}

const MAIN_NAV_ITEMS: NavItem[] = [
  { navTitle: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { navTitle: 'Create new user', path: '/admin/createUser', icon: <PersonAddIcon /> },
];

export const useGetNavItems = () => {
  const navigate = useNavigate();
  const redirectHandler = (path: string) => navigate(path);

  const mainListItems = MAIN_NAV_ITEMS.map((nav: NavItem) => {
    return (
      <ListItemButton key={nav.navTitle} onClick={() => redirectHandler(nav.path)}>
        <ListItemIcon>{nav.icon}</ListItemIcon>
        <ListItemText primary={nav.navTitle} />
      </ListItemButton>
    );
  });

  return { mainListItems };
};

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </>
);
