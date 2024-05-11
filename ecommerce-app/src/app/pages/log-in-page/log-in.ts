export default class LogInPage {
  form: HTMLFormElement;

  email: HTMLInputElement;

  password: HTMLInputElement;

  loginButton: HTMLButtonElement;

  constructor() {
    this.form = document.createElement('form');
    this.email = document.createElement('input');
    this.password = document.createElement('input');
    this.loginButton = document.createElement('button');
  }
}
