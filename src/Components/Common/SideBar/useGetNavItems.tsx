import { ReactNode } from 'react';
import { SingleListItem } from './SingleListItem';
import { NestedLisItem } from './NestedLisItem';
import { List } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
export interface SingleNavItem {
  readonly navTitle: string;
  readonly path: string;
  readonly icon: ReactNode;
}

export interface NestedNavItem extends SingleNavItem {
  readonly subNavItem: SingleNavItem[];
}

const DEMANDES_SUB_NAV_ITEMS: SingleNavItem[] = [
  { navTitle: 'Déplacement', path: '/demande/deplacement', icon: <TimeToLeaveIcon /> },
  { navTitle: 'Absence / Congé', path: '/demande/absence-conge', icon: <LocalCafeIcon /> },
  { navTitle: 'Heures supplémentaires', path: '/demande/heures-supplémentaires', icon: <AccessTimeFilledIcon /> },
];

const DEMANDES = { navTitle: 'Demandes', path: '#', icon: <TextSnippetIcon />, subNavItem: DEMANDES_SUB_NAV_ITEMS };
const DASHBOARD = { navTitle: 'Tableau de bord', path: '/', icon: <DashboardIcon /> };
const CREATE_USER = { navTitle: 'Create user', path: '/admin/create-user', icon: <PersonAddIcon /> };
const temp = { navTitle: 'Demande Contrôl', path: '/admin/application', icon: <RemoveRedEyeIcon /> };

export const useGetNavItems = () => {
  const userListItems = (
    <List>
      <SingleListItem navItem={DASHBOARD} />
      <NestedLisItem navItem={DEMANDES} />
    </List>
  );
  const adminListItems = (
    <List>
      <SingleListItem navItem={CREATE_USER} />
      <SingleListItem navItem={temp} />
    </List>
  );

  return { userListItems, adminListItems };
};
