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
  CREATE = 'Matériel en création',
  TRANSFER = 'Matériel en transaction',

}

export enum Calculation {
  IN = 'Entrée',
  OUT = 'Sortie',
}

export enum Warehouse {
  TW = 'Taïwan',
  SN = 'Sénégal',
}

export enum Transfering {
  TOSN = 'À Sénégal',
  TOTW = 'À Taïwan'
}

export interface MaterialModel {
  readonly id?: string;
  readonly itemId: string;
  readonly erpId: string;
  readonly initiateur: string;
  readonly department: string;
  readonly createDate: Moment | string;
  readonly materialName: string;
  readonly materialZhName: string;
  readonly spec: string;
  readonly price: number;
  readonly currency: Currency;
  readonly brand: string;
  readonly defaultQuantity: number;
  readonly defaultWarehouse: Warehouse;
  readonly totalQuantity: number;
  readonly totalSnQuantity: number;
  readonly totalTwQuantity: number;
  readonly photo: string;
  readonly record: MaterialQuantityFlow[];
}

export interface MaterialTableRow {
  readonly id: string;
  readonly itemId: string;
  readonly erpId: string;
  readonly materialName: string;
  readonly materialZhName: string;
  readonly spec: string;
  readonly totalQuantity: number;
}

export interface MaterialQuantityFlow {
  readonly initiateur: string;
  readonly note: string;
  readonly warehouse: Warehouse;
  readonly calculation: Calculation;
  readonly operation: Operation;
  readonly operationDate: string;
  readonly quantityToBeProcessed: number | string;
  readonly subtotalQuantity: number;
}
