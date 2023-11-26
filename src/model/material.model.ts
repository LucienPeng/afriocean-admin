import { Moment } from 'moment';

export enum MaterialItemFormMode {
  CREATE,
  EDIT,
}

export enum Currency {
  CFA,
  EUR,
  TWD,
  USD,
}

export enum QuantityOperation {
  INCREASE,
  DECREASE
}

export interface MaterialModel {
  readonly id?: string;
  readonly firstName: string;
  readonly department: string;
  readonly requestDate: Moment | string;
  readonly erpId: string;
  readonly materialName: string;
  readonly materialZhName: string;
  readonly initiateur: string;
  readonly spec: string;
  readonly price: string;
  readonly currency: Currency;
  readonly brand: string;
  readonly quantity: number;
  readonly photo: string;
  readonly date: string
  readonly record: MaterialQuantityFlow[]
}

export interface MaterialTableRow {
  readonly id: string;
  readonly erpId: string;
  readonly materialName: string;
  readonly materialZhName: string;
  readonly spec: string;
  readonly quantity: number;
  readonly photo: string;
}


export interface MaterialQuantityFlow {
  readonly operation: QuantityOperation;
  readonly operationQuantity: number;
  readonly totalQuantity: number;
}
