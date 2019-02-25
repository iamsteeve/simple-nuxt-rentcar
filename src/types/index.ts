export * from './state';
export * from './models';

export interface Contact {
  email: string;
  phone: string;
}

export interface Address {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}


export interface ISelectVueData {
  text: string;
  value: string;
}
export interface Stats {
  totalCustomers: number;
  totalSales: number;
  totalReservations: number;
}