export default class HeaderComponent {
  appName: HTMLHeadingElement;

  navBar: HTMLElement;

  navigation: HTMLUListElement;

  navItem: HTMLLIElement;

  link: HTMLAnchorElement;

  constructor() {
    this.appName = document.createElement('h1');
    this.navBar = document.createElement('nav');
    this.navigation = document.createElement('ul');
    this.navItem = document.createElement('li');
    this.link = document.createElement('a');
  }
}
