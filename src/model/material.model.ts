export interface MaterialModel {
  readonly serialIndex: string;
  readonly erpId: string;
  readonly department: string;
  readonly materialName: string;
  readonly materialZhName: string;
  readonly spec: string;
  readonly price: string;
  readonly currency: string;
  readonly brand: string;
  readonly quantity: number;
  readonly photo: string;
  readonly barCode: string;
}
