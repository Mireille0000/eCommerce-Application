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
    this.password = document.createElement('input');
    this.loginButton = document.createElement('button');
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);

    return this.pageWrapper;
  }
}
