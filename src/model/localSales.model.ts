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
  Poisson = 'Fataya au poisson',
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
  readonly variant: ItemVariant;
  readonly spec: ItemSpec;
  readonly price: number;
  readonly quantity: number;
  readonly id: string;
}

export const THON: Product = {
  category: ItemCategory.PoudreDePoisson,
  spec: PoudreDePoissonSpec.BagFor100,
  variant: ItemVariant.Thon,
  id: '6046000084002',
  price: 200,
  quantity: 1,
};

export const MULLET: Product = {
  category: ItemCategory.PoudreDePoisson,
  spec: PoudreDePoissonSpec.BagFor100,
  variant: ItemVariant.Mullet,
  id: '6046000084064',
  price: 200,
  quantity: 1,
};

export const SARDINELLE: Product = {
  category: ItemCategory.PoudreDePoisson,
  spec: PoudreDePoissonSpec.BagFor100,
  variant: ItemVariant.Sardinelle,
  id: '6046000084125',
  price: 200,
  quantity: 1,
};

export const FATAYA: Product = {
  category: ItemCategory.Fataya,
  spec: FatayaSpec.BoxFor10,
  variant: ItemVariant.Poisson,
  id: '6046000084187',
  price: 100,
  quantity: 1,
};

export const DEFALUT_POUDRE_POISSON_BAG_100_LIST: Product[] = [THON, MULLET, SARDINELLE];

export const DEFALUT_FATAYA_BOX_10_LIST: Product[] = [FATAYA];
