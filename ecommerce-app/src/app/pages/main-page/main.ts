import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import { createDivElement, createImage, createSpanElement } from '../../utils/functions';

export const routes = [
  '#log-in-page',
  '#registration-page',
  '#catalog-product-page',
  '#basket-page',
  '#about-us-page',
  '#profile-page',
]; //
export default class MainPage extends Page {
  info: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'main-page';
    this.info = this.createPromoCode();
    // this.info = createHtmlElement('div', 'star', 'A shining star should be here');
  }

  private createPromoCode() {
    const promoCodeWrap = createDivElement('main__promo-code-wrap');
    const promoCodeTitle = createSpanElement('main__promo-code-title', 'Promo code');
    const promoCodedescr = createSpanElement('main__promo-code-descr', '30% on everything!');
    const promoCodeContent = createSpanElement('main__promo-code-content', '30ALL');
    promoCodeWrap.append(promoCodeTitle, promoCodedescr, promoCodeContent);
    return promoCodeWrap;
  }

  renderPage(): HTMLDivElement {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    const headerCompInstance = new HeaderComponent();
    const { appName, logoContainer, logo, navBar, navigation, navItem, link } = headerCompInstance;
    this.addElemsToHeader(appName, logoContainer, navBar);
    logoContainer.append(logo);
    navBar.className = 'navigation-main-page';
    navBar.append(navigation);
    const isUserLoggedIn = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string);
    const logLink = isUserLoggedIn ? 'Log out' : 'Log in';
    const profileLink = isUserLoggedIn ? 'Profile' : false;
    const linkName = [logLink, 'Register', 'Catalog', 'Basket', 'About Us', 'Profile'];
    navigation.append(navItem);
    navItem.className = 'nav-item';
    for (let i = 0; i < linkName.length - 2; i += 1) {
      navigation.appendChild(navItem.cloneNode(true));
    }

    if (profileLink) {
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

    const mage = createDivElement('mage');
    const createImageMage = createImage(
      'https://64.media.tumblr.com/d7901976056e69c382b78796f8f32ede/tumblr_mlljbc7M0A1rfjowdo1_500.gif',
      'Mage',
      'mage-image'
    );

    const createImageAnotherMage = createImage(
      'https://miro.medium.com/v2/resize:fit:768/1*mUYZpTpdfHXKNwcOzw2JhA.gif',
      'Another Mage',
      'another-mage-image'
    );

    mage.append(createImageMage, createImageAnotherMage);
    this.addElemsToMain(this.info, mage);

    return this.pageWrapper;
  }
}
