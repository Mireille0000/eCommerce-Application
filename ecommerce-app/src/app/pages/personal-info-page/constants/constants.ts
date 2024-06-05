import { AdrsMap, FieldsMap } from '../../../utils/types';
import {
  condBirthPersonal,
  condEmailPersonal,
  condOldPswrdPersonal,
  condPswrdPersonal,
  conditionHouseNumber,
  conditionPostcode,
  conditionStreet,
  conditionWord,
} from '../../registration-page/validation/validationFn';
import {
  errBirthPersonal,
  errEmailPersonal,
  errMsgsHouseNumber,
  errMsgsPostcode,
  errMsgsStreet,
  errMsgsWord,
  errNewPswdPersonal,
  errOldPswdPersonal,
} from '../../registration-page/validation/validationMsgs';

export const enum ClssNms {
  WRAPPER = 'wrapper',
  WRAPPER_PI = 'wrapper--PI',
  MAIN = 'personal-info-main',
  WRAPPER_MAIN = 'wrapper-main',
  WRAPPER_MAIN_PI = 'wrapper-main--PI',
  TITLE = 'PI__title',
  TITLE_HEADING = 'PI__title-heading',
  CONTAINER = 'PI__container',
  CONTAINER_TITLE = 'PI__container-title',
  CONTAINER_TTL_HEAD = 'PI__container-title-heading',
  U_INFO = 'user-info',
  U_INFO_FIELD_WRAP = 'user-info__field-wrap',
  U_INFO_FIELD = 'user-info__field',
  U_INFO_DESCR_WRAP = 'user-info__descr-wrap',
  U_INFO_DESCR = 'user-info__descr',
  U_INFO_CONTENT_WRAP = 'user-info__content-wrap',
  U_INFO_CONTENT = 'user-info__content',
  U_INFO_CONTENT_INPUT = 'user-info__content-input',
  U_INFO_CONTENT_INPUT_OPEN_BTN = 'user-info__content-input-open-btn',
  U_INFO_CONTENT_ADRS_TYPE_WRAP = 'user-info__content-adrs-type-wrap',
  U_INFO_CONTENT_ADRS_TYPE = 'user-info__content-adrs-type',
  U_INFO_CONTENT_ADRS_TYPE_BTN_DEL = 'user-info__content-adrs-type-btn-delete',
  U_INFO_OPEN_LIST_TYPE = 'user-info__open-list-type',
  U_INFO_OPEN_TYPE_ELEM = 'user-info__open-type-elem',
  U_INFO_OPEN_NO_OPT = 'user-info__open-no-options',
  FIRST_NAME_CONTENT = 'first-name__content',
  U_INFO_EDIT = 'user-info__edit',
  U_INFO_EDIT_BTN = 'user-info__edit-btn',
  U_INFO_EDIT_BTN_DISABLED = 'user-info__edit-btn--disabled',
  FIRST_NAME_EDIT_BTN = 'first-name__edit-btn',
  IMG_EDIT = 'img-edit',
  LAST_NAME_CONTENT = 'last-name__content',
  LAST_NAME_EDIT = 'last-name__edit',
  DATE_BIRTH_CONTENT = 'date-of-birth__content',
  DATE_BIRTH_EDIT = 'date-of-birth__edit',
  EMAIL_CONTENT = 'email__content',
  EMAIL_EDIT_BTN = 'email__edit-btn',
  U_ADRS = 'user-address',
  U_INFO_ADRS_INFO = 'user-info__address-info',
  U_INFO_ADRS_NUMBER_WRAP = 'user-info__address-number-wrap',
  U_INFO_ADRS_NUMBER = 'user-info__address-number',
  U_INFO_ADRS_CONTAINER = 'user-info__address-container',
  U_INFO_ADRS_WRAP = 'user-info__address-wrap',
  U_INFO_ADRS = 'user-info__address',
  U_INFO_ADRS_TYPE_WRAP = 'user-info__address-type-wrap',
  U_INFO_ADRS_TYPE = 'user-info__address-type',
  U_INFO_ADRS_OPEN = 'user-info__address-open',
  ADRS_OPEN = 'address-open',
  U_INFO_BTNS = 'user-info__btns',
  U_INFO_DELETE_ADDRESS = 'user-info__delete-adress',
  U_INFO_DELETE_ADDRESS_BTN = 'user-info__delete-adress-btn',
  ADRS_DELETE_BTN = 'address__delete-btn',
  IMG_DELETE_ADRS = 'img-delete-adress',
  U_INFO_TOGGLE = 'user-info__toggle',
  U_INFO_TOGGLE_BTN = 'user-info__toggle-btn',
  ADRS_TOGGLE_BTN = 'address__toggle-btn',
  IMG_TOGGLE = 'img-toggle',
}

export const enum Txt {
  MAIN_TITLE = 'Personal information',
  BASIC_TITLE = 'Basic information',
  SECURITY_TITLE = 'Security Information (change password)',
  FIRST_NAME_DSCR = 'First Name',
  LAST_NAME_DSCR = 'Last Name',
  DATE_OF_BIRTH_DSCR = 'Date-of-birth',
  CONTACT_INF_TITLE = 'Contact Information',
  EMAIL_DSCR = 'Email',
  ADRSS_TITLE = 'Addresses',
  ADRS_DSCR = 'Address',
  SECURITY_INF_TITLE = 'Security Information',
  PSWD_DSCR = 'Password',
  ADRS_DEF_BILL = 'Default Billing',
  ADRS_DEF_SHIP = 'Default Shipping',
  ADRS_BILL = 'Billing',
  ADRS_SHIP = 'Shipping',
  ALT_EDIT = 'edit',
  ALT_DELETE_ADRS = 'delete-address',
  ALT_TOGGLE = 'toggle',
  COUNTRY_DSCR = 'Country',
  SITY_DSCR = 'City',
  STREET_DSCR = 'Street',
  STREET_NUMB_DSCR = 'Street Number',
  POSTAL_CODE_DSCR = 'Postal Code',
  ADRS_TYPE_DSCR = 'Address Type',
  ADRS_COUNTRY = 'Germany',
  NO_OPTIONS = 'No options',
}

export const AdrsType = {
  BILLING: 'Billing',
  SHIPPING: 'Shipping',
  BILLING_DEFAULT: 'Default Billing',
  SHIPPING_DEFAULT: 'Default Shipping',
};

export const fieldMapping: FieldsMap = {
  [Txt.FIRST_NAME_DSCR]: 'firstName',
  [Txt.LAST_NAME_DSCR]: 'lastName',
  [Txt.DATE_OF_BIRTH_DSCR]: 'dateOfBirth',
  [Txt.EMAIL_DSCR]: 'email',
  'Old Password': 'currentPassword',
  'New Password': 'newPassword',
};

export const adrsFieldMap: AdrsMap = {
  city: 'city',
  streetName: 'streetName',
  streetNumber: 'streetNumber',
  postalCode: 'postalCode',
  country: 'country',
  // addressType: 'addressType',
};

export const msgUpdateData = ['Success!', 'Data updated successfully.'];
export const msgUpdateFail = ['Failure!', 'Something went wrong :('];
export const msgPassSuccess = ['Success!', 'Password successfully updated.'];
export const msgPassFail = ['Failure!', 'The entered password is incorrect.'];

export const basicCondFn = [conditionWord, conditionWord, condBirthPersonal];
export const basicErr = [errMsgsWord, errMsgsWord, errBirthPersonal];

export const contactCondFn = [condEmailPersonal];
export const contErr = [errEmailPersonal];

export const securFields = [
  {
    field: 'Old Password',
    value: '••••••••',
  },
  {
    field: 'New Password',
    value: '••••••••',
  },
];
export const securCondFn = [condOldPswrdPersonal, condPswrdPersonal];
export const securErr = [errOldPswdPersonal, errNewPswdPersonal];

export const adrsCondFn = [conditionStreet, conditionWord, conditionStreet, conditionHouseNumber, conditionPostcode];
export const adrsErr = [errMsgsStreet, errMsgsWord, errMsgsStreet, errMsgsHouseNumber, errMsgsPostcode];
