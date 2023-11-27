import { Moment } from 'moment';
export const DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';
export const DATE_FORMAT = 'DD.MM.YYYY';

export enum Applications {
  Deplacement = 'Déplacement',
  Absence = 'Absence',
  HeuresSupplementaires = 'Heures Supplementaires',
}

export interface ApplicationModel {
  readonly uid?: string;
  readonly id?: string;
  readonly firstName?: string;
  readonly department?: string;
  readonly requestDate?: Moment | string;
  readonly isProcessed?: boolean;
  readonly isApproved?: boolean | null;
  readonly email?: string;
  readonly applicationType?: Applications;
  readonly comment?: string;
}
