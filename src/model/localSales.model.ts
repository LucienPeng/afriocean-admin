export enum LocalSalesFormMode {
  CREATE = 'Create',
  EDIT = 'Edit',
}

export enum ItemCategory {
  Fataya = 'Fataya',
  PoudreDePoisson = 'Poudre de poisson',
}

export enum ItemVariant {
  Fataya = 'Fataya',
  PoudreDePoisson = 'Poudre de poisson',
}

export interface LocalSalesCustomer {
  readonly uuid: string;
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly birthday: null | Date;
  readonly phone1: string;
  readonly phone2?: string;
  readonly email?: string;
}

export interface LocalSalesOrder {
  readonly orderId: string;
  readonly customer: string;
  readonly product: Product;
}

interface Product {
  readonly category: ItemCategory;
  readonly variant: ItemVariant;
  readonly price: number;
  readonly quantity: number;
}
