import { Address, CustomerChangeAddressAction, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { ActionsEdit, AdrssEdit } from '../../pages/personal-info-page/constants/types';
import { apiRoot } from '../registration-form-request/clients';
import { CustomerDataUpdate } from '../../utils/types';

export interface AdrsEdit {
  id?: string;
  streetName?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  country: string;
  // addressType?: string[];
}

const createCustomerAdrssUpdateDraft = (
  editFields: AdrssEdit,
  editData: ActionsEdit,
  customerData: CustomerDataUpdate
) => {
  const actions: CustomerUpdateAction[] = [];
  const { version } = customerData;
  const versionEditData = customerData;
  if (editData.length) {
    actions.push(...editData);
  }

  editFields.forEach((adrsEdit) => {
    const { id } = adrsEdit;
    const addressEdit: AdrsEdit = {
      country: 'DE',
    };

    if (adrsEdit.city) {
      addressEdit.city = adrsEdit.city;
    }
    if (adrsEdit.country) {
      addressEdit.country = adrsEdit.country;
    }
    if (adrsEdit.postalCode) {
      addressEdit.postalCode = adrsEdit.postalCode;
    }
    if (adrsEdit.streetName) {
      addressEdit.streetName = adrsEdit.streetName;
    }
    if (adrsEdit.streetNumber) {
      addressEdit.streetNumber = adrsEdit.streetNumber;
    }

    addressEdit.country = 'DE';

    if (Object.keys(addressEdit).length) {
      const address: Address = addressEdit;

      const adrsObj: CustomerChangeAddressAction = {
        action: 'changeAddress',
        addressId: id,
        address,
      };
      actions.push(adrsObj);
    }
  });
  const versionAdd = actions.length;
  versionEditData.version += versionAdd;

  return {
    version: Number(version),
    actions,
  };
};

export const updateAdrssFields = (
  editFields: AdrssEdit,
  editData: ActionsEdit,
  customerData: CustomerDataUpdate,
  ID: string
) => {
  return apiRoot
    .customers()
    .withId({ ID })
    .post({
      body: createCustomerAdrssUpdateDraft(editFields, editData, customerData),
    })
    .execute();
};
