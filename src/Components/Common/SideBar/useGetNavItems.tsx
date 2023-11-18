import { ReactNode } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { SingleItem } from './SingleList';
import { NestedLisItem } from './NestedList';

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

const dem = { navTitle: 'Demandes', path: '#', icon: <TextSnippetIcon />, subNavItem: DEMANDES_SUB_NAV_ITEMS };

const tab = { navTitle: 'Tableau de bord', path: '/', icon: <DashboardIcon /> };
const cre = { navTitle: 'Create user', path: '/admin/createUser', icon: <PersonAddIcon /> };

export const useGetNavItems = () => {
  const userListItems = (
    <>
      <SingleItem navItem={tab} />
      <NestedLisItem navItem={dem} />
    </>
  );
  const adminListItems = <SingleItem navItem={cre} />;

  return { userListItems, adminListItems };
};
