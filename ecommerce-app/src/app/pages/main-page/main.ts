import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import createHtmlElement from '../../utils/functions';

export const routes = ['#log-in-page', '#registration-page'];
export default class MainPage extends Page {
  info: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'main-page';
    this.info = createHtmlElement('div', 'star', 'A shining star should be here');
  }

  renderPage(): HTMLDivElement {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    const headerCompInstance = new HeaderComponent();
    const headerElems = [
      headerCompInstance.appName,
      headerCompInstance.navBar,
      headerCompInstance.navigation,
      headerCompInstance.navItem,
      headerCompInstance.link,
    ];
    const [title, navigation, navList, navListItem, link] = headerElems;
    this.addElemsToHeader(title, navigation);
    navigation.className = 'navigation-main-page';
    navigation.append(navList);
    const linkName = ['Log in', 'Register'];
    navList.append(navListItem);
    navListItem.className = 'nav-item';
    for (let i = 0; i < 1; i += 1) {
      navList.appendChild(navListItem.cloneNode(true));
    }
    const navListItemsArr = Array.from(document.querySelectorAll('.nav-item'));

    for (let i = 0; i < navListItemsArr.length; i += 1) {
      navListItemsArr[i].appendChild(link.cloneNode(true));
    }
    const navLinksArr = Array.from(document.querySelectorAll('.nav-item a'));

    for (let i = 0; i < navLinksArr.length; i += 1) {
      navLinksArr[i].innerHTML = linkName[i];
      navLinksArr[i].setAttribute('href', routes[i]);
    }

    title.innerHTML = 'Ultimate ScriptSmith';

    this.addElemsToMain(this.info);

    return this.pageWrapper;
  }
}
