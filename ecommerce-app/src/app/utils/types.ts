export type PageElements = Array<HTMLElement>;

export type StringArr = Array<string>;

type conditionFn = (value: string) => boolean;
export type arrConditionFn = conditionFn[];

export interface AddressTypes {
  [key: string]: string[];
}

export interface Address {
  id: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  addressType?: string[];
}

export interface CurrAddress {
  id: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  addressType: string[];
}

export type Addresses = Address[];

export interface CustomerData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Addresses;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
}

export interface CurrAdrs {
  Country: string;
  City: string;
  Street: string;
  'Street Number': string;
  'Postal Code': string;
  'Address Type': string;
}

export interface AdrsValueObj {
  [currValue: string]: string | undefined;
}
