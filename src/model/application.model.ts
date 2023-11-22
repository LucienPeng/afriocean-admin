import { Moment } from 'moment';
export const DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';

export enum Applications {
  Deplacement = 'Déplacement',
  Absence = 'Absence',
  HeuresSupplementaires = 'Heures Supplementaires',
}

export interface ApplicationModel {
  readonly uid?: string;
  readonly id?: string;
  readonly isProcessed?: boolean;
  readonly isApproved?: boolean | null;
  readonly firstName?: string;
  readonly email?: string;
  readonly department?: string;
  readonly requestDate?: Moment | string;
  readonly applicationType?: Applications;
  readonly comment?: string;
}
