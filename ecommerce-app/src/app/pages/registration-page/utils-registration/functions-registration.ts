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

function goToMainPageWindow(result: ClientResponse) {
  console.log('typeof result.statusCode:', typeof result.statusCode);
  console.log('ВСЁ ПРАВИЛЬНО:', result);
  getCustomerByKey(result.body.customer.key)
    .then((res) => console.log('ВЕРНУЛ ПО КЛЮЧУ:', res))
    .catch((err) => console.log('ВЫШЛА ОШИБОЧКА(((:', err));

  if (result.statusCode === 201) {
    const main = document.querySelector('.main');

    const authWindowWrap = createHtmlElement('div', 'wrapper__auth');
    const authWindow = createHtmlElement('div', 'wrapper__auth-window');
    const msgWindowElem = createHtmlElement(
      'p',
      'msg__auth-window',
      'The account has been successfully created. To go to the main page click on the button below.'
    );
    const btnAuth = createHtmlElement('button', 'btn__auth-window', 'Go to main page');
    btnAuth.addEventListener('click', (event) => {
      event.preventDefault();
      const wrapper = document.querySelector('.wrapper');
      wrapper?.remove();
    });
    authWindow.append(msgWindowElem, btnAuth);
    authWindowWrap.appendChild(authWindow);
    main?.appendChild(authWindowWrap);
  }
}

function createMsgExistAcc(isEmail = true) {
  const main = document.querySelector('.main') as HTMLElement;

  const regMsg = createHtmlElement('div', 'reg-msg');
  const msgWindow = createHtmlElement('div', 'reg-msg__window');
  const msgWrapp = createHtmlElement('div', 'reg-msg__wrapper');
  const msgTitle = createHtmlElement('h3', 'reg-msg__title', 'Account exists');
  const titleAndDescr = isEmail
    ? ['reg-msg__descr', 'Account with this email address already exists. Please log in or try a different email.']
    : ['Invalid data entry', 'Try entering other entry data'];
  const msgDescr = createHtmlElement('p', ...titleAndDescr);
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
  }, 4000);
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
    // console.log(firstName, lastName, birthDate, email, password, country, city, streetName, streetNumber, postalCode);

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
        checkCustomer(email, password, 'auth-error-message').catch((err) => err.message);
      })
      .catch((errRes) => {
        // console.log('ВЫШЛА ОШИБКА:', errRes);
        if (
          errRes.statusCode === 400 &&
          errRes.message === 'There is already an existing customer with the provided email.'
        ) {
          createMsgExistAcc();
        } else {
          createMsgExistAcc(false);
        }
      });
    // goToMainPageWindow();
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
