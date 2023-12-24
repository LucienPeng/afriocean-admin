export interface LocalSalesCustomer {
  uuid: string;
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  birthday: Date | undefined;
  phone1: string;
  phone2?: string;
  email?: string;
}
