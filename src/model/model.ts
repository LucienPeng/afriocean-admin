import { Moment } from "moment";

export const DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';

export enum Roles {
  ADMIN = 'Administrator',
  USER = 'User',
}

export interface ApplicationModel {
  readonly id?: string;
  readonly isProcessed?: boolean;
  readonly isApproved?: boolean | null;
  readonly firstName?: string;
  readonly email?: string;
  readonly department?: string;
  readonly requestDate?: Moment | string;
  readonly applicationType?: Applications;
}

export enum Applications {
  Deplacement = 'Déplacement',
  Absence = 'Absence',
  HeuresSupplementaires = 'Heures Supplementaires'
}

export enum Department {
  GM = 'General Management',
  SG = 'Services Généraux',
  ADMIN = 'Administration',
  COMPTABITITE = 'Comptabilité',
  COMMERCIAL = 'Commercial',
  MAINTENANCE = 'Maintenance',
  PRODUCTION = 'Production',
}

export interface Profile {
  readonly uid: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: Roles | string;
  readonly department: Department | string;
}

