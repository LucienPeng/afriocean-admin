export enum LocalSalesCustomerFormMode {
  CREATE = 'Create',
  EDIT = 'Edit',
}

export interface LocalSalesCustomer {
  uuid: string;
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  birthday: Date | null;
  phone1: string;
  phone2?: string;
  email?: string;
}
