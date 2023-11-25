export enum Currency {
  CFA,
  EUR,
  TWD,
  USD
}

export interface MaterialModel {
  readonly serialIndex: string;
  readonly erpId: string;
  readonly department: string;
  readonly materialName: string;
  readonly materialZhName: string;
  readonly spec: string;
  readonly price: string;
  readonly currency: Currency;
  readonly brand: string;
  readonly quantity: number;
  readonly photo: string;
}

