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
  birthday: null | Date;
  phone1: string;
  phone2?: string;
  email?: string;
}
