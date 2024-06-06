import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import createHtmlElement from '../../utils/functions';

export const routes = ['#log-in-page', '#registration-page', '#catalog-product-page', '#profile-page']; // change profile page id if needed
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
    const { appName, logoContainer, logo, navBar, navigation, navItem, link } = headerCompInstance;
    this.addElemsToHeader(appName, logoContainer, navBar);
    // logo.src = iconRobe;
    // logo.alt = 'icon Mage Robe';
    console.log(logo);
    logoContainer.append(logo);
    navBar.className = 'navigation-main-page';
    navBar.append(navigation);
    const isUserLoggedIn = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string);
    const logLink = isUserLoggedIn ? 'Log out' : 'Log in';
    const profileLink = isUserLoggedIn ? 'Profile' : false;
    console.log(isUserLoggedIn, logLink, profileLink);
    const linkName = [logLink, 'Register', 'Catalog', 'Profile'];
    navigation.append(navItem);
    navItem.className = 'nav-item';
    for (let i = 0; i < 2; i += 1) {
      navigation.appendChild(navItem.cloneNode(true));
    }

    if (profileLink) {
      console.log('appending');
      navigation.append(navItem.cloneNode(true)); // adding an additional link for profile page if user is loggged in
    }
    const navListItemsArr = Array.from(document.querySelectorAll('.nav-item'));

    for (let i = 0; i < navListItemsArr.length; i += 1) {
      navListItemsArr[i].appendChild(link.cloneNode(true));
    }
    const navLinksArr = Array.from(document.querySelectorAll('.nav-item a'));

    for (let i = 0; i < navLinksArr.length; i += 1) {
      navLinksArr[i].innerHTML = linkName[i];
      navLinksArr[i].setAttribute('href', routes[i]);
      console.log('I ran');
    }

    const logInLink = navLinksArr[0];

    logInLink.addEventListener('click', (event) => {
      event.preventDefault();
      if (isUserLoggedIn) {
        localStorage.clear();
        window.location.hash = '';
        window.location.hash = 'main-page';
      } else {
        window.location.hash = 'log-in-page';
      }
    });

    appName.innerHTML = 'Ultimate ScriptSmith';

    this.addElemsToMain(this.info);

    return this.pageWrapper;
  }
}
