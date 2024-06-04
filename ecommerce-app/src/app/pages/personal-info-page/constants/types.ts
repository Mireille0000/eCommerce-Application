export interface AdrsEdit {
  id?: string;
  streetName?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  addressType?: string[];
}

export type AdrssEdit = AdrsEdit[];

export type Action =
  | 'removeShippingAddressId'
  | 'removeBillingAddressId'
  | 'addShippingAddressId'
  | 'addBillingAddressId'
  | 'setDefaultBillingAddress'
  | 'setDefaultShippingAddress'
  | 'removeAddress';

export interface ActionEdit {
  action: Action;
  addressId?: string;
}

export type ActionsEdit = ActionEdit[];
