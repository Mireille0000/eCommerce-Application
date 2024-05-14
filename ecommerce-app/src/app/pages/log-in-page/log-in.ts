import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import createHtmlElement from '../../utils/functions';

export default class LogInPage extends Page {
  form: HTMLFormElement;

  email: HTMLInputElement;

  password: HTMLInputElement;

  loginButton: HTMLButtonElement;

  regButton: HTMLButtonElement;

  constructor() {
    super();
    this.appName.className = 'log-in-heading';
    this.form = createHtmlElement('form', 'log-in-form');
    this.email = createHtmlElement('input', 'email-input', '', [{ name: 'placeholder', value: 'Email' }]);
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
    const emailContainer = createHtmlElement('div');
    const passwordContainer = createHtmlElement('div');
    const emailHint = createHtmlElement('span');
    const passwordHint = createHtmlElement('span');
    fieldset.append(legend, emailContainer, passwordContainer);
    emailContainer.append(this.email, emailHint);
    passwordContainer.append(this.password, passwordHint);
    return this.pageWrapper;
  }
}
