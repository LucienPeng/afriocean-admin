export enum Roles {
  ADMIN,
  USER,
}

export enum Department {
  GM = 'General Management',
  SG = 'Services Généraux',
  ADMIN = 'Administration',
  COMPTABITITE = 'Comptabilité',
  COMMERCIAL = 'Commercial',
  MAINTENANCE = 'Maintenance',
  PRODUCTION = 'Production'
}

export interface Profile {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: Roles | string;
  readonly department: Department | string;
}
