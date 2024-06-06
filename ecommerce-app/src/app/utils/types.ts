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
  id: string;
  version: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Addresses;
  currentPassword?: string;
  newPassword?: string;
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

type UserDataKeys = 'firstName' | 'lastName' | 'dateOfBirth' | 'email' | 'currentPassword' | 'newPassword';
export interface FieldsMap {
  [key: string]: UserDataKeys;
}

export type CustomerDataUpdate = CustomerData;
export interface FieldsEdit {
  [key: string]: string;
}

export type AdrsObj = 'id' | 'streetName' | 'streetNumber' | 'postalCode' | 'city' | 'country';
//  | 'addressType';
export interface AdrsMap {
  [key: string]: AdrsObj;
}
