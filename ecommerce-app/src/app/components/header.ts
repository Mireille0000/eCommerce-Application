export default class HeaderComponent {
  appName: HTMLHeadingElement;

  navigation: HTMLElement;

  linksList: HTMLUListElement;

  link: HTMLLIElement;

  constructor() {
    this.appName = document.createElement('h1');
    this.navigation = document.createElement('nav');
    this.linksList = document.createElement('ul');
    this.link = document.createElement('li');
  }
}
