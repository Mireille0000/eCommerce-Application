import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient, { ProcessEnv } from './BuildClient';

const projectKey = ProcessEnv.CTP_PROJECT_KEY as string;

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

type CustomerData = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  key: string;
  streetName: string;
  streetNumber: string;
  city: string;
  country: string;
  postalCode: string;
};

// const getCustomerByKey = (key: string) => {
//   return apiRoot
//     .customers()
//     .withKey({ key })
//     .get()
//     .execute();
// };

// getCustomerByKey('test123456')
//   .then(console.log)
//   .catch(console.log);

const createCustomerDraft = (customerData: CustomerData) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    password,
    key,
    streetName,
    streetNumber,
    city,
    country,
    postalCode,
  } = customerData;

  return {
    firstName,
    lastName,
    email,
    dateOfBirth,
    password,
    key,
    addresses: [
      {
        streetName,
        streetNumber,
        city,
        country,
        postalCode,
      },
    ],
  };
};

export const createCustomer = (customerData: CustomerData) => {
  return apiRoot
    .customers()
    .post({
      body: createCustomerDraft(customerData),
    })
    .execute();
};

export const customerDraftData = {
  firstName: 'Checktestim',
  lastName: 'Test',
  email: 'checkTestim@test.com',
  password: 'Password1!',
  key: 'checkApiii',
  countryCode: 'DE',
};
