import Page from '../../templates/page';
import HeaderComponent from '../../components/header';

export default class LogInPage extends Page {
  form: HTMLFormElement;

  email: HTMLInputElement;

  password: HTMLInputElement;

  loginButton: HTMLButtonElement;

  constructor() {
    super();
    this.form = document.createElement('form');
    this.email = document.createElement('input');
    this.email.className = 'email-input';
    this.password = document.createElement('input');
    this.password.className = 'password-input';
    this.loginButton = document.createElement('button');
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    // header
    const headerComponent = new HeaderComponent();
    const headerComponentItems = [
      headerComponent.appName,
      headerComponent.navigation,
      headerComponent.linksList,
      headerComponent.link,
    ];
    const [name, navigation, list, link] = headerComponentItems;
    this.addElemsToHeader(name, navigation);
    navigation.append(list);
    list.append(link);
    list.appendChild(link.cloneNode(true)); // to refactor
    const linksArr = Array.from(document.querySelectorAll('li'));
    const links = ['Back to Main', 'Registration'];
    for (let i = 0; i < linksArr.length; i += 1) {
      linksArr[i].innerHTML = links[i];
    }
    name.innerHTML = 'Ultimate ScriptSmith';
    // form
    this.addElemsToMain(this.form);
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    this.form.append(fieldset, this.loginButton);
    const emailContainer = document.createElement('div');
    const passwordContainer = document.createElement('div');
    const emailHint = document.createElement('span');
    const passwordHint = document.createElement('span');
    fieldset.append(legend, emailContainer, passwordContainer);
    emailContainer.append(this.email, emailHint);
    passwordContainer.append(this.password, passwordHint);
    legend.innerHTML = 'Authentication form';
    this.email.placeholder = 'Email';
    this.password.placeholder = 'Password';
    this.loginButton.innerHTML = 'Log in';
    return this.pageWrapper;
  }
}
