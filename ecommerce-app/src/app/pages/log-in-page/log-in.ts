import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import createHtmlElement, {
  emailInputEventHandler,
  logInBtnEventHandler,
  passwordInputEventHandler,
} from '../../utils/functions';

export default class LogInPage extends Page {
  form: HTMLFormElement;

  email: HTMLInputElement;

  emailHint: HTMLSpanElement;

  password: HTMLInputElement;

  passwordHint: HTMLSpanElement;

  loginButton: HTMLButtonElement;

  regButton: HTMLButtonElement;

  constructor() {
    super();
    this.appName.className = 'log-in-heading';
    this.form = createHtmlElement('form', 'log-in-form');
    this.email = createHtmlElement('input', 'email-input', '', [{ name: 'placeholder', value: 'Email' }]);
    this.emailHint = createHtmlElement('span', 'email-hint');
    this.passwordHint = createHtmlElement('span', 'password-hint');
    this.password = createHtmlElement('input', 'password-input', '', [{ name: 'placeholder', value: 'Password' }]);
    this.loginButton = createHtmlElement('button', 'log-in', 'Log in');
    this.regButton = createHtmlElement('button', 'sign-up', 'Sign up');
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    // header
    const headerComponent = new HeaderComponent();
    const headerComponentItems = [
      headerComponent.appName,
      headerComponent.navBar,
      headerComponent.navigation,
      headerComponent.navItem,
      headerComponent.link,
    ];
    headerComponent.navBar.className = 'nav-bar';
    const [name, navigation, list, listItem, link] = headerComponentItems;
    this.addElemsToHeader(name, navigation);
    navigation.append(list);
    list.append(listItem);
    listItem.append(link);
    link.innerHTML = 'Back to Main';
    name.innerHTML = 'Ultimate ScriptSmith';
    // form
    this.addElemsToMain(this.form);
    const fieldset = createHtmlElement('fieldset', 'log-in-fieldset');
    const legend = createHtmlElement('legend', 'log-in-legend', 'Authentication form');
    this.form.append(fieldset, this.loginButton, this.regButton);
    const emailContainer = createHtmlElement('div', 'email-container');
    const passwordContainer = createHtmlElement('div', 'password-container');
    fieldset.append(legend, emailContainer, passwordContainer);
    const hintsContainerEmail = createHtmlElement('div', 'hints-email');
    const hintsContainerPassword = createHtmlElement('div', 'hints-password');
    hintsContainerEmail.append(this.emailHint);
    hintsContainerPassword.append(this.passwordHint);
    emailContainer.append(this.email, hintsContainerEmail);
    for (let i = 0; i < 2; i += 1) {
      hintsContainerEmail.appendChild(this.emailHint.cloneNode(true));
    }

    for (let i = 0; i < 5; i += 1) {
      hintsContainerPassword.appendChild(this.passwordHint.cloneNode(true));
    }
    passwordContainer.append(this.password, hintsContainerPassword);

    logInBtnEventHandler(this.email, 'email-hint', 'log-in');
    emailInputEventHandler(this.email, 'email-input', 'email-hint');

    passwordInputEventHandler(this.password, 'password-input', 'password-hint');
    return this.pageWrapper;
  }
}
