import { ReactNode } from 'react';
import { SingleListItem } from './SingleListItem';
import { NestedLisItem } from './NestedLisItem';
import { Divider, List } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
export interface SingleNavItem {
  readonly navTitle: string;
  readonly path: string;
  readonly icon?: ReactNode;
}

export interface NestedNavItem extends SingleNavItem {
  readonly subNavItem: SingleNavItem[];
}

const DEMANDES_SUB_NAV_ITEMS: SingleNavItem[] = [
  { navTitle: 'Déplacement', path: '/application/deplacement' },
  { navTitle: 'Absence / Congé', path: '/application/absence-conge' },
  { navTitle: 'Heures supplémentaires', path: '/application/heures-supplémentaires' },
];

const LOCAL_SALES_SUB_NAV_ITEMS = [
  { navTitle: 'Clients', path: '/local-sales/customers' },
  { navTitle: 'Commandes', path: '/local-sales/orders' },
];

const ADMIN_APPLICATION_PORTAL = {
  navTitle: 'Demande Contrôl',
  path: '/admin/application',
  icon: <RemoveRedEyeIcon />,
};

const LOCAL_SALES = {
  navTitle: 'Ventes locales',
  path: '#',
  icon: <PointOfSaleIcon />,
  subNavItem: LOCAL_SALES_SUB_NAV_ITEMS,
};

const DEMANDES = { navTitle: 'Demandes', path: '#', icon: <AssignmentIcon />, subNavItem: DEMANDES_SUB_NAV_ITEMS };
const DASHBOARD = { navTitle: 'Tableau de bord', path: '/', icon: <DashboardIcon /> };
const CAISSE = { navTitle: 'Caisse', path: '#', icon: <LocalAtmIcon /> };
const MATERIAUX = { navTitle: 'Matériaux', path: '/material', icon: <InventoryIcon /> };
const CREATE_USER = { navTitle: 'Create user', path: '/admin/create-user', icon: <PersonAddIcon /> };
const USER_APPLICATION_PORTAL = { navTitle: 'Mes Demandes', path: '/application', icon: <RemoveRedEyeIcon /> };

export const useGetNavItems = () => {
  const adminListItems = (
    <List component="nav">
      <SingleListItem navItem={DASHBOARD} />
      <NestedLisItem navItem={LOCAL_SALES} />
      <NestedLisItem navItem={DEMANDES} isDisabled={true} />
      <SingleListItem navItem={CAISSE} isDisabled={true} />
      <SingleListItem navItem={MATERIAUX} isDisabled={true} />
      <Divider sx={{ my: 1 }} />
      <SingleListItem navItem={CREATE_USER} />
      <SingleListItem navItem={ADMIN_APPLICATION_PORTAL} />
    </List>
  );

  const userListItems = (
    <List component="nav">
      <SingleListItem navItem={DASHBOARD} />
      <NestedLisItem navItem={DEMANDES} />
      <SingleListItem navItem={CAISSE} isDisabled={true} />
      <SingleListItem navItem={MATERIAUX} />
      <Divider sx={{ my: 1 }} />
      <SingleListItem navItem={USER_APPLICATION_PORTAL} />
    </List>
  );

  return { userListItems, adminListItems };
};
