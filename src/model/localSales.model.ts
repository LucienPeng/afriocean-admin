export enum LocalSalesFormMode {
  CREATE = 'Create',
  EDIT = 'Edit',
}

export enum ItemCategory {
  Fataya = 'Fataya',
  PoudreDePoisson = 'Poudre de poisson',
}

export enum ItemVariant {
  Thon = 'Thon',
  Mullet = 'Mullet',
  Sardinelle = 'Sardinelle',
}

export type ItemSpec = PoudreDePoissonSpec | FatayaSpec;

export enum PoudreDePoissonSpec {
  BagFor100 = 'Paquet - 100g',
}

export enum FatayaSpec {
  BoxFor10 = 'Boîte - 10 pièces',
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
  readonly date: null | Date;
  readonly customer: LocalSalesCustomer;
  readonly product: Product[];
  readonly totalePrice: string;
}

export interface Product {
  readonly category: ItemCategory;
  readonly variant?: ItemVariant;
  readonly spec: ItemSpec;
  readonly price: number;
  readonly quantity: number;
}
