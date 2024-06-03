import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient, { ProcessEnv } from './BuildClient';

const projectKey = ProcessEnv.CTP_PROJECT_KEY as string;

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

export type Address = {
  streetName: string;
  streetNumber: string;
  city: string;
  country: string;
  postalCode: string;
};

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  key: string;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses: number[];
  billingAddresses?: number[];
};

export type CustomerData = Data & {
  shippingAddress: Address;
  billingAddress?: Address;
};

type CustomerDraftData = Data & {
  addresses: Address[];
};

// export const getCustomerByKey = (key: string) => {
//   return apiRoot.customers().withKey({ key }).get().execute();
// };
// export const getCustomerByKey = async (key: string) => {
//   try {
//     const response = await apiRoot.customers().withKey({ key }).get().execute();
//     return response;
//   } catch (err) {
//     console.error('ВЫШЛА ОШИБОЧКА:', err);
//     throw err; // чтобы вызвать обработчик ошибок в .catch()
//   }
// };

const createCustomerDraft = (customerData: CustomerData) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    password,
    key,
    shippingAddress,
    billingAddress,
    defaultShippingAddress,
    defaultBillingAddress,
    shippingAddresses,
    billingAddresses,
  } = customerData;

  const addresses = [shippingAddress];

  if (billingAddress) {
    addresses.push(billingAddress);
  }

  const customerDraft: CustomerDraftData = {
    firstName,
    lastName,
    email,
    dateOfBirth,
    password,
    key,
    addresses,
    shippingAddresses,
  };

  if (defaultShippingAddress !== null) customerDraft.defaultShippingAddress = defaultShippingAddress;
  if (defaultBillingAddress !== null) customerDraft.defaultBillingAddress = defaultBillingAddress;
  if (billingAddresses) customerDraft.billingAddresses = billingAddresses;

  return customerDraft;
};

const createCustomer = async (customerData: CustomerData) => {
  return apiRoot
    .customers()
    .post({
      body: createCustomerDraft(customerData),
    })
    .execute();
};

export default createCustomer;
