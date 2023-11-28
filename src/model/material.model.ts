import { Moment } from 'moment';

export enum MaterialItemFormMode {
  CREATE = 'Create',
  EDIT = 'Edit',
}

export enum Currency {
  CFA = 'CFA',
  EUR = 'EUR',
  TWD = 'TWD',
  USD = 'USD',
}

export enum Operation {
  INANDOUT = 'Entrée-sortie',
  INVENTORY = 'Inventaire',
}

export enum Calculation {
  IN = 'Entrée',
  OUT = 'Sortie',
}

export interface MaterialModel {
  readonly id?: string;
  readonly itemId: string;
  readonly erpId: string;
  readonly firstName: string;
  readonly department: string;
  readonly requestDate: Moment | string;
  readonly materialName: string;
  readonly materialZhName: string;
  readonly spec: string;
  readonly price: string;
  readonly currency: Currency;
  readonly brand: string;
  readonly defaultQuantity: number;
  readonly totalQuantity: number;
  readonly photo: string;
  readonly date: string;
  readonly record: MaterialQuantityFlow[];
}

export interface MaterialTableRow {
  readonly id: string;
  readonly erpId: string;
  readonly materialName: string;
  readonly materialZhName: string;
  readonly spec: string;
  readonly totalQuantity: number;
  readonly photo: string;
}

export interface MaterialQuantityFlow {
  readonly initiateur: string;
  readonly calculation: Calculation;
  readonly operation: Operation;
  readonly operationDate: string;
  readonly quantityToBeProcessed: number | string;
  readonly subtotalQuantity: number;
}
