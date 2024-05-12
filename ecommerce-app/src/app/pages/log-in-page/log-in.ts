import Page from '../../templates/page';

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
    this.addElemsToHeader(this.appName);
    this.appName.innerHTML = 'Ultimate ScriptSmith';
    this.addElemsToMain(this.form);
    const filedset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    this.form.append(filedset, this.loginButton);
    filedset.append(legend, this.email, this.password);
    legend.innerHTML = 'Authentication form';
    this.email.placeholder = 'Email';
    this.password.placeholder = 'Password';
    this.loginButton.innerHTML = 'Log in';
    return this.pageWrapper;
  }
}
