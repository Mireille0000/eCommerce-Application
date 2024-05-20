import { createCustomer } from '../../../server-requests/registration-form-request/clients';
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

function goToMainPageWindow() {
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
    console.log(firstName, lastName, birthDate, email, password, country, city, streetName, streetNumber, postalCode);

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

    createCustomer(customerDraftData).then(console.log).catch(console.log);
    goToMainPageWindow();
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
