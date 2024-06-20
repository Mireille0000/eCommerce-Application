import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import createHtmlElement, { addEventHandler, createImage } from '../../utils/functions';
import checkCustomer from '../../server-requests/log-in-form-requests/login-form-requests';

import {
  emailInputEventHandler,
  logInBtnEventHandler,
  passwordInputEventHandler,
  isEmailFormat,
  isPasswordFormat,
} from '../log-in-page/utils-log-in/functions-log-in';

import openedeye from '../../../assets/images/eye.png';
import closedEye from '../../../assets/images/close-eye.png';

export default class LogInPage extends Page {
  form: HTMLFormElement;

  email: HTMLInputElement;

  emailHint: HTMLSpanElement;

  password: HTMLInputElement;

  passwordHint: HTMLSpanElement;

  loginButton: HTMLButtonElement;

  regButton: HTMLButtonElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'log-in-page';
    this.appName.className = 'log-in-heading';
    this.form = createHtmlElement('form', 'log-in-form');
    this.email = createHtmlElement('input', 'email-input', '', [{ name: 'placeholder', value: 'Email' }]);
    this.emailHint = createHtmlElement('span', 'email-hint');
    this.passwordHint = createHtmlElement('span', 'password-hint');
    this.password = createHtmlElement('input', 'password-input', '', [
      { name: 'placeholder', value: 'Password' },
      { name: 'type', value: 'password' },
    ]);
    this.loginButton = createHtmlElement('button', 'log-in', 'Log in');
    this.regButton = createHtmlElement('button', 'sign-up', 'Sign up');
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    this.main.className = 'log-in-main';
    // header
    const headerComponent = new HeaderComponent();
    const { appName, logoContainer, logo, navBar, navigation, navItem, link } = headerComponent;
    headerComponent.navBar.className = 'nav-bar';
    this.addElemsToHeader(appName, logoContainer, navBar);
    logoContainer.append(logo);
    navBar.append(navigation);
    navigation.append(navItem);
    navItem.append(link);
    navItem.className = 'nav-item';
    const basketIcon = createHtmlElement('i', 'fa-solid fa-cart-shopping') as HTMLElement;
    const linkText = ['Back to Main', 'Catalog', 'About Us', `${basketIcon}`];
    const linkHrefs = ['#main-page', '#catalog-product-page', '#about-us-page', '#basket-page'];
    for (let i = 0; i < linkText.length - 1; i += 1) {
      navigation.appendChild(navItem.cloneNode(true));
    }

    const links = Array.from(document.querySelectorAll('.nav-item a'));
    for (let i = 0; i < links.length; i += 1) {
      if (linkText[i] !== '[object HTMLElement]') {
        links[i].innerHTML = linkText[i];
        console.log(links[i]);
      } else {
        links[i].append(basketIcon);
      }
      links[i].setAttribute('href', linkHrefs[i]);
    }
    appName.innerHTML = 'Ultimate ScriptSmith';
    // form
    this.addElemsToMain(this.form);
    const fieldset = createHtmlElement('fieldset', 'log-in-fieldset');
    const legend = createHtmlElement('legend', 'log-in-legend', 'Authentication form');
    this.form.append(fieldset, this.loginButton, this.regButton);
    const emailContainer = createHtmlElement('div', 'email-container');
    const passwordContainer = createHtmlElement('div', 'password-container');

    const authErrorMessage = createHtmlElement('span', 'auth-error-message');
    fieldset.append(legend, emailContainer, passwordContainer);
    const hintsContainerEmail = createHtmlElement('div', 'hints-email');
    const hintsContainerPassword = createHtmlElement('div', 'hints-password');
    hintsContainerEmail.append(this.emailHint);
    hintsContainerPassword.append(this.passwordHint);
    emailContainer.append(this.email, hintsContainerEmail);
    const passwordEye = createHtmlElement('span', 'show-password');

    for (let i = 0; i < 2; i += 1) {
      hintsContainerEmail.appendChild(this.emailHint.cloneNode(true));
    }

    for (let i = 0; i < 5; i += 1) {
      hintsContainerPassword.appendChild(this.passwordHint.cloneNode(true));
    }
    passwordContainer.append(this.password, passwordEye, hintsContainerPassword);
    const openedEyeImage = createImage(openedeye, 'Opened eye', 'opened-eye', new Image());
    const closedEyeImage = createImage(closedEye, 'Closed eye', 'closed-eye', new Image());
    addEventHandler('show-password', 'click', () => {
      if (this.password.type === 'password') {
        closedEyeImage.style.display = 'none';
        openedEyeImage.style.display = 'block';
        this.password.setAttribute('type', 'text');
        passwordEye.append(openedEyeImage);
      } else {
        openedEyeImage.style.display = 'none';
        closedEyeImage.style.display = 'flex';
        passwordEye.append(closedEyeImage);
        this.password.setAttribute('type', 'password');
      }
    });

    this.loginButton.addEventListener('click', (e) => {
      if (isEmailFormat.test(this.email.value) && isPasswordFormat.test(this.password.value)) {
        fieldset.append(authErrorMessage);
        checkCustomer(this.email.value, this.password.value, 'auth-error-message').catch((err) => err.message);
        const logInBtnDisabled = document.querySelector('.log-in');
        logInBtnDisabled?.setAttribute('disabled', '');

        window.sessionStorage.clear(); //

        setTimeout(() => logInBtnDisabled?.removeAttribute('disabled'), 6000);
      } else {
        console.log('invalid cridentials');
      }

      e.preventDefault();
    });

    this.regButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.hash = 'registration-page';
    });
    passwordEye.append(closedEyeImage);

    logInBtnEventHandler(this.email, 'email-hint', 'log-in');
    emailInputEventHandler(this.email, 'email-input', 'email-hint');

    passwordInputEventHandler(this.password, 'password-input', 'password-hint');

    // footer
    const complitionDate = createHtmlElement('div', 'complition-date', '© 2024') as HTMLDivElement;
    this.addElemsToFooter(complitionDate);
    return this.pageWrapper;
  }
}
