import Page from '../../templates/page';
import createHtmlElement from '../../utils/functions';
import { StringArr, arrConditionFn } from '../../utils/types';
import { btnEventHandler } from './utils-registration/functions-registration';
import {
  conditionBirthDate,
  conditionEmail,
  conditionWord,
  conditionPassword,
  conditionStreet,
  conditionHouseNumber,
  conditionPostcode,
} from './validation/validationFn';
import {
  errMsgsBirthDate,
  errMsgsHouseNumber,
  errMsgsPostcode,
  errMsgsStreet,
  errMsgsWord,
  errorMsgsEmail,
  errorMsgsPassword,
} from './validation/validationMsgs';

export default class RegistrationPage extends Page {
  form: HTMLFormElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'registration-page';
    this.form = createHtmlElement('form', 'registration-form');
  }

  private createFormElement(
    labelText: string,
    inputClass: string,
    placeholderValue: string,
    hintsName: string,
    hintName: string = '',
    errMsgs: StringArr = [],
    conditionDone: arrConditionFn = []
  ) {
    const userInputElem = createHtmlElement('div', 'USInput');

    const labelForm = createHtmlElement('div', 'USLabel');
    const label = createHtmlElement('label', 'USLabel__label', labelText);
    labelForm.appendChild(label);

    const hintsForm = createHtmlElement('div', `USInput__hints ${hintsName}`);

    errMsgs.forEach((errMsg) => {
      const errElem = createHtmlElement('span', `USInput__hint ${hintName}`, errMsg);
      hintsForm.appendChild(errElem);
    });

    const inputForm = createHtmlElement('div', 'USInput__container');
    if (labelText === 'Country') {
      const selectCountry = createHtmlElement('select', 'USInput__container__select');
      const optionCountry = createHtmlElement('option', 'USInput__container__select-choice', 'Germany');
      selectCountry.appendChild(optionCountry);
      inputForm.appendChild(selectCountry);
    } else {
      const input = createHtmlElement('input', `USInput__input ${inputClass}`, '', [
        { name: 'placeholder', value: placeholderValue },
      ]) as HTMLInputElement;
      if (inputClass === 'password__input') {
        input.setAttribute('type', 'password');
      }
      input.addEventListener('input', () => {
        const { value } = input;
        input.removeAttribute('style');

        conditionDone.forEach((condition, index) => {
          const errMsg = hintsForm.children[index] as HTMLElement;
          if (condition(value) || value.length === 0) {
            errMsg.style.display = 'none';
          } else {
            errMsg.style.display = 'block';
          }
        });
      });
      inputForm.appendChild(input);
    }

    userInputElem.append(labelForm, inputForm, hintsForm);

    return userInputElem;
  }

  private createAddressForm(addressType: string) {
    const adrsWrap = createHtmlElement('div', `${addressType}-wrapper`);
    const adrsTitle = createHtmlElement(
      'h3',
      `${addressType}-title`,
      `${addressType[0].toUpperCase().concat(addressType.slice(1))} Address`
    );
    const adrsRegion = createHtmlElement('div', `${addressType}-region`);
    const countryIn = this.createFormElement('Country', 'country__input', '', 'hints-country');
    const cityIn = this.createFormElement(
      'City',
      `city__input ${addressType}-city__input`,
      'Berlin',
      'hints-city',
      'hint-city',
      errMsgsWord,
      conditionWord
    );
    adrsRegion.append(countryIn, cityIn);

    const adrsHome = createHtmlElement('div', `${addressType}-home`);
    const streetIn = this.createFormElement(
      'Street',
      `street__input ${addressType}-street__input`,
      'Friedrichstraße',
      'hints-street',
      'hint-street',
      errMsgsStreet,
      conditionStreet
    );
    const streetNumberIn = this.createFormElement(
      'Street Number',
      `house__input ${addressType}-house__input`,
      '21a',
      'hints-house',
      'hint-house',
      errMsgsHouseNumber,
      conditionHouseNumber
    );
    adrsHome.append(streetIn, streetNumberIn);

    const adrsPostal = createHtmlElement('div', `${addressType}-postal-code`);
    const postcodeIn = this.createFormElement(
      'Postal code',
      `postcode__input ${addressType}-postal-code__input`,
      '12345',
      'hints-postcode',
      'hint-postcode',
      errMsgsPostcode,
      conditionPostcode
    );
    adrsPostal.appendChild(postcodeIn);

    const adrsDefault = createHtmlElement('div', `${addressType}-default-addrs`);
    const labelDefaultAddrs = createHtmlElement('label', '', 'Set as default address');
    const inputDefaultAddrs = createHtmlElement('input', `${addressType}-default-addrs__choise`, '', [
      { name: 'type', value: 'checkbox' },
    ]);
    labelDefaultAddrs.prepend(inputDefaultAddrs);
    adrsDefault.appendChild(labelDefaultAddrs);

    if (addressType === 'shipping') {
      const shippingChbxs = createHtmlElement('div', `${addressType}-chbxs`);
      const addBillingAdrs = createHtmlElement('div', `${addressType}-add-billing-adrs`);
      const labelAddBilling = createHtmlElement('label', '', 'Also use as billing address');
      const inputAddBilling = createHtmlElement('input', `${addressType}-add-billing__input`, '', [
        { name: 'type', value: 'checkbox' },
      ]) as HTMLInputElement;
      inputAddBilling.addEventListener('input', () => {
        const { checked } = inputAddBilling;
        if (checked) {
          const billingWrapp = document.querySelector('.billing-wrapper');
          billingWrapp?.remove();
        } else {
          const billingAddrs = this.createAddressForm('billing');
          adrsWrap.insertAdjacentElement('afterend', billingAddrs);
        }
      });
      labelAddBilling.prepend(inputAddBilling);
      addBillingAdrs.appendChild(labelAddBilling);
      shippingChbxs.append(adrsDefault, addBillingAdrs);
      adrsWrap.append(adrsTitle, adrsRegion, adrsHome, adrsPostal, shippingChbxs);
    } else {
      adrsWrap.append(adrsTitle, adrsRegion, adrsHome, adrsPostal, adrsDefault);
    }
    return adrsWrap;
  }

  public renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.main);
    this.main.classList.add('registration-main');

    const regTitle = createHtmlElement('legend', 'registration-title', 'Registration form');
    const firstNameIn = this.createFormElement(
      'First Name',
      'first-name__input',
      'Ivan',
      'hints-firstName',
      'hints-firstName',
      errMsgsWord,
      conditionWord
    );
    const lastNameIn = this.createFormElement(
      'Last Name',
      'last-name__input',
      'Ivanov',
      'hints-lastName',
      'hints-lastName',
      errMsgsWord,
      conditionWord
    );
    const birthDateIn = this.createFormElement(
      'Date of Birth (Year, Month, Day)',
      'birth-date__input',
      '2000.05.24',
      'hints-birth',
      'hints-birth',
      errMsgsBirthDate,
      conditionBirthDate
    );
    const emailIn = this.createFormElement(
      'Email',
      'email__input',
      'example@gmail.com',
      'hints-email',
      'hint-email',
      errorMsgsEmail,
      conditionEmail
    );
    const passwordIn = this.createFormElement(
      'Password',
      'password__input',
      'Example73!',
      'hints-password',
      'hint-password',
      errorMsgsPassword,
      conditionPassword
    );

    const shippingAddrs = this.createAddressForm('shipping');
    const billingAddrs = this.createAddressForm('billing');

    const registBtnWrapp = createHtmlElement('div', 'registration__btn-wrapper');
    const registBtn = createHtmlElement('button', 'registration__btn', 'Sign up');
    registBtn.addEventListener('click', btnEventHandler);
    const registBtnHint = createHtmlElement('span', 'registration__btn__hint', 'Please fill out all fields correctly');
    registBtnWrapp.append(registBtn, registBtnHint);

    const registrFieldset = createHtmlElement('fieldset', 'registration-fieldset');
    const fieldsetItems = [
      regTitle,
      firstNameIn,
      lastNameIn,
      birthDateIn,
      emailIn,
      passwordIn,
      shippingAddrs,
      billingAddrs,
      registBtnWrapp,
    ];
    registrFieldset.append(...fieldsetItems);

    this.form.appendChild(registrFieldset);

    this.addElemsToMain(this.form);

    return this.pageWrapper;
  }
}
