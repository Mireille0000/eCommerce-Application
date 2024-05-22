import { ClientResponse } from '@commercetools/platform-sdk';
import createHtmlElement from '../../../utils/functions';
import { arrConditionFn } from '../../../utils/types';
import {
  conditionBirthDate,
  conditionEmail,
  conditionHouseNumber,
  conditionPassword,
  conditionPostcode,
  conditionStreet,
  conditionWord,
} from '../validation/validationFn';
import checkCustomer from '../../../server-requests/login-form-requests';
import createCustomer, { Address } from '../../../server-requests/registration-form-request/clients';

type DataCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  key: string;
  shippingAddress: Address;
  billingAddress?: Address;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses: number[];
  billingAddresses: number[];
};

function checkDataRegistration(inputClass: string, conditionArrFn: arrConditionFn) {
  const inputElem = document.querySelector(`.${inputClass}`) as HTMLInputElement;
  const inputValue = inputElem.value;
  for (let i = 0; i < conditionArrFn.length; i += 1) {
    if (!conditionArrFn[i](inputValue)) {
      inputElem.style.borderColor = 'red';
      return undefined;
    }
  }
  return inputValue;
}

export function createMsgRegAcc(arrDescr: string[]) {
  const title = arrDescr[0];
  const descr = arrDescr[1];
  const main = document.querySelector('main') as HTMLElement;

  const regMsg = createHtmlElement('div', 'reg-msg');
  const msgWindow = createHtmlElement('div', 'reg-msg__window');
  const msgWrapp = createHtmlElement('div', 'reg-msg__wrapper');
  const msgTitle = createHtmlElement('h3', 'reg-msg__title', title);
  const msgDescr = createHtmlElement('p', 'reg-msg__descr', descr);
  const btnMsgClosed = createHtmlElement('div', 'reg-msg__closed');
  btnMsgClosed.addEventListener('click', (event) => {
    event.preventDefault();
    regMsg.remove();
  });

  msgWrapp.append(msgTitle, msgDescr);
  msgWindow.append(msgWrapp, btnMsgClosed);
  regMsg.appendChild(msgWindow);
  main.appendChild(regMsg);

  setTimeout(() => {
    regMsg.remove();
  }, 5000);
}

function goToMainPageWindow(result: ClientResponse) {
  const registrationPage = document.getElementById('registration-page');

  const msgReg = ['Registered', 'Registration successful! You`re now logged in.'];

  if (result.statusCode === 201) {
    registrationPage?.remove();
    window.location.hash = '#main-page';
    setTimeout(() => createMsgRegAcc(msgReg), 0);
  }
}

function customerAuth() {
  if (window.location.hash === '#main-page') {
    const element = document.querySelector('a[href="#log-in-page"]');
    if (element) {
      element.textContent = 'Log out';
    }
  }
}

function getAddress(addressType: string) {
  const address = document.querySelector(`.${addressType}-wrapper`);
  if (address === null) return undefined;

  const streetName = (address.querySelector(`.${addressType}-street__input`) as HTMLInputElement).value;
  const streetNumber = (address.querySelector(`.${addressType}-house__input`) as HTMLInputElement).value;
  const city = (address.querySelector(`.${addressType}-city__input`) as HTMLInputElement).value;
  const country = 'DE';
  const postalCode = (address.querySelector(`.${addressType}-postal-code__input`) as HTMLInputElement).value;

  return {
    streetName,
    streetNumber,
    city,
    country,
    postalCode,
  };
}

function getAddrsDefault(addressType: string) {
  const addrsDefault = document.querySelector(`.${addressType}-default-addrs__choise`) as HTMLInputElement;
  if (addrsDefault) {
    const { checked } = addrsDefault;
    if (checked) {
      return addressType === 'shipping' ? 0 : 1;
    }
  }
  return null;
}

function getDataRegistration() {
  const firstName = checkDataRegistration('first-name__input', conditionWord);
  const lastName = checkDataRegistration('last-name__input', conditionWord);
  const birthDate = checkDataRegistration('birth-date__input', conditionBirthDate);
  const dateOfBirth = birthDate ? birthDate.split('.').join('-') : birthDate;
  const email = checkDataRegistration('email__input', conditionEmail);
  const password = checkDataRegistration('password__input', conditionPassword);
  const { textContent: country } = document.querySelector('.USInput__container__select-choice') as HTMLElement;
  const city = checkDataRegistration('city__input', conditionWord);
  const streetName = checkDataRegistration('street__input', conditionStreet);
  const streetNumber = checkDataRegistration('house__input', conditionHouseNumber);
  const postalCode = checkDataRegistration('postcode__input', conditionPostcode);

  const shippingAddress = getAddress('shipping') as Address;
  const billingAddress = getAddress('billing');
  const defaultShippingAddress = getAddrsDefault('shipping');
  const defaultBillingAddress = getAddrsDefault('billing');
  const shippingAddresses = [0];
  const billingAddresses = [1];

  return {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
    country,
    city,
    streetName,
    streetNumber,
    postalCode,
    shippingAddress,
    billingAddress,
    defaultShippingAddress,
    defaultBillingAddress,
    shippingAddresses,
    billingAddresses,
  };
}

export function btnEventHandler(event: Event) {
  event.preventDefault();

  const dataRgstr = getDataRegistration();
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
    country,
    city,
    streetName,
    streetNumber,
    postalCode,
    shippingAddress,
    billingAddress,
    defaultShippingAddress,
    defaultBillingAddress,
    shippingAddresses,
    billingAddresses,
  } = dataRgstr;

  const errMsgRegistrBtn = document.querySelector('.registration__btn__hint') as HTMLElement;

  const fieldsCorrect =
    !!firstName &&
    !!lastName &&
    !!dateOfBirth &&
    !!email &&
    !!password &&
    !!country &&
    !!city &&
    !!streetName &&
    !!streetNumber &&
    !!postalCode;
  if (fieldsCorrect) {
    errMsgRegistrBtn.removeAttribute('style');

    const key = new Date().getTime().toString().slice(7);

    const customerDraftData: DataCustomer = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      password,
      key,
      shippingAddress,
      shippingAddresses,
      billingAddresses,
    };

    if (defaultShippingAddress !== null) {
      customerDraftData.defaultShippingAddress = defaultShippingAddress;
      if (!billingAddress) customerDraftData.defaultBillingAddress = defaultShippingAddress;
    }
    if (defaultBillingAddress !== null) {
      customerDraftData.defaultBillingAddress = defaultBillingAddress;
    }
    if (billingAddress) {
      customerDraftData.billingAddress = billingAddress;
    } else {
      customerDraftData.billingAddresses = shippingAddresses;
    }

    createCustomer(customerDraftData)
      .then((res) => {
        goToMainPageWindow(res);
        checkCustomer(customerDraftData.email, customerDraftData.password, 'auth-error-message')
          .then(customerAuth)
          .catch((err) => err.message);
      })
      .catch((errRes) => {
        const msgRegExist = [
          'Account exists',
          'Account with this email address already exists. Please log in or try a different email.',
        ];
        const msgRegAcc = ['Invalid data entry', 'Try entering other entry data'];
        const msgReg =
          errRes.message === 'There is already an existing customer with the provided email.' ? msgRegExist : msgRegAcc;
        createMsgRegAcc(msgReg);
      });
  } else {
    errMsgRegistrBtn.style.display = 'block';
  }
}

export function inputEventHandler(
  input: HTMLInputElement,
  hintsForm: HTMLElement,
  validateFunctsArr: arrConditionFn = []
) {
  input.addEventListener('input', () => {
    const { value } = input;
    validateFunctsArr.forEach((condition, index) => {
      const errMsg = hintsForm.children[index] as HTMLElement;
      if (condition(value) || value.length === 0) {
        errMsg.style.display = 'none';
      } else {
        errMsg.style.display = 'block';
      }
    });
  });
}
