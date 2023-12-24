export interface LocalSalesCustomer {
  uuid: string;
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  birthday: Date;
  phone1: string;
  phone2?: string;
  email?: string;
}
