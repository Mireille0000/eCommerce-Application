import {
  CustomerChangeEmailAction,
  CustomerSetDateOfBirthAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { CustomerDataUpdate, FieldsEdit } from '../../utils/types';
import { apiRoot } from '../registration-form-request/clients';

const createCustomerEmailUpdateDraft = (editFields: FieldsEdit, customerData: CustomerDataUpdate) => {
  const { firstName, lastName, dateOfBirth, email } = editFields;
  const { version } = customerData;
  const versionEditData = customerData;

  const actions: CustomerUpdateAction[] = [];

  if (firstName) {
    const changeFirstNameAction: CustomerSetFirstNameAction = {
      action: 'setFirstName',
      firstName,
    };
    actions.push(changeFirstNameAction);
    versionEditData.version += 1;
  }

  if (firstName) {
    const changeLastNameAction: CustomerSetLastNameAction = {
      action: 'setLastName',
      lastName,
    };
    actions.push(changeLastNameAction);
    versionEditData.version += 1;
  }

  if (dateOfBirth) {
    const changeDateOfBirthAction: CustomerSetDateOfBirthAction = {
      action: 'setDateOfBirth',
      dateOfBirth,
    };
    actions.push(changeDateOfBirthAction);
    versionEditData.version += 1;
  }

  if (email) {
    const changeEmailAction: CustomerChangeEmailAction = {
      action: 'changeEmail',
      email,
    };
    actions.push(changeEmailAction);
    versionEditData.version += 1;
  }

  return {
    version: Number(version),
    actions,
  };
};

const updateCustomerField = (customerData: CustomerDataUpdate, editFields: FieldsEdit) => {
  const { id: ID } = customerData;
  return apiRoot
    .customers()
    .withId({ ID })
    .post({
      body: createCustomerEmailUpdateDraft(editFields, customerData),
    })
    .execute();
};

export default updateCustomerField;
