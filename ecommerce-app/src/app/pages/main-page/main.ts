import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import createHtmlElement, { createDivElement, createImage, createSpanElement } from '../../utils/functions';

export const routes = [
  '#log-in-page',
  '#registration-page',
  '#catalog-product-page',
  '#about-us-page',
  '#basket-page',
  '#profile-page',
]; //
export default class MainPage extends Page {
  info: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'main-page';
    this.info = this.createPromoCode();
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
    const basketIcon = createHtmlElement('i', 'fa-solid fa-cart-shopping') as HTMLElement;
    const linkName = [logLink, 'Register', 'Catalog', 'About Us', `${basketIcon}`, 'Profile'];
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
      if (linkName[i] !== '[object HTMLElement]') {
        navLinksArr[i].innerHTML = linkName[i];
        console.log(linkName[i]);
      } else {
        navLinksArr[i].append(basketIcon);
      }
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

    // main
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

    const aboutAppInfo = createHtmlElement(
      'p',
      'about-app-info',
      'In "Ultimate ScriptSmith" store you will definitely find everything you need for creating reusable, secure, scalable and maintainable magic!'
    );

    mage.append(createImageMage, createImageAnotherMage);
    const promoMageContainer = createHtmlElement('div', 'promo-mage-container');
    promoMageContainer.append(this.info, mage);
    this.addElemsToMain(aboutAppInfo, promoMageContainer);

    // footer
    const complitionDate = createHtmlElement('div', 'complition-date', '© 2024') as HTMLDivElement;
    this.addElemsToFooter(complitionDate);

    return this.pageWrapper;
  }
}
