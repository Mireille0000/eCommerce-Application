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

  createNavigation(list: HTMLElement, listItem: HTMLElement, numOfLinks: number, link: HTMLElement) {
    for (let i = 0; i < numOfLinks; i += 1) {
      listItem.append(link);
      const linkItem = link;
      linkItem.className = 'nav-link';
      list.appendChild(listItem.cloneNode(true));
    }
  }
}
