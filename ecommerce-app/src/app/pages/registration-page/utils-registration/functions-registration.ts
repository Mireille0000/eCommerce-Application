import { ClientResponse } from '@commercetools/platform-sdk';
import { createCustomer, getCustomerByKey } from '../../../server-requests/registration-form-request/clients';
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

  getCustomerByKey(result.body.customer.key)
    .then()
    .catch((err) => console.log('ВЫШЛА ОШИБОЧКА:', err));

  if (result.statusCode === 201) {
    registrationPage?.remove();
    window.location.hash = 'main-page';
    setTimeout(() => createMsgRegAcc(msgReg), 0);
  }
}

export function btnEventHandler(event: Event) {
  event.preventDefault();

  const errMsgRegistrBtn = document.querySelector('.registration__btn__hint') as HTMLElement;

  const firstName = checkDataRegistration('first-name__input', conditionWord);
  const lastName = checkDataRegistration('last-name__input', conditionWord);
  const birthDate = checkDataRegistration('birth-date__input', conditionBirthDate);
  const email = checkDataRegistration('email__input', conditionEmail);
  const password = checkDataRegistration('password__input', conditionPassword);
  const { textContent: country } = document.querySelector('.USInput__container__select-choice') as HTMLElement;
  const city = checkDataRegistration('city__input', conditionWord);
  const streetName = checkDataRegistration('street__input', conditionStreet);
  const streetNumber = checkDataRegistration('house__input', conditionHouseNumber);
  const postalCode = checkDataRegistration('postcode__input', conditionPostcode);

  const fieldsCorrect =
    !!firstName &&
    !!lastName &&
    !!birthDate &&
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
    const dateOfBirth = birthDate.split('.').join('-');
    const customerDraftData = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      password,
      key,
      streetName,
      streetNumber,
      city,
      country: 'DE',
      postalCode,
    };

    createCustomer(customerDraftData)
      .then((res) => {
        goToMainPageWindow(res);
        checkCustomer(customerDraftData.email, customerDraftData.password, 'auth-error-message').catch(
          (err) => err.message
        );
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
