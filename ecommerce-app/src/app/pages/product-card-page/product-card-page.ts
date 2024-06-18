import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import CardImageModalWindow from './modal-windows/card-image'; //
import createHtmlElement, { addEventHandler } from '../../utils/functions';
import getToken from '../../server-requests/detailed-product-page-requests/detailed-product-page-requests';

const routes = [
  '#log-in-page',
  '#registration-page',
  '#main-page',
  '#catalog-product-page',
  '#basket-page',
  '#about-us-page',
  '#profile-page',
];

export default class ProductCardPage extends Page {
  productCardContainer: HTMLDivElement;

  imageElem: HTMLDivElement;

  image: HTMLImageElement;

  productCardContent: HTMLElement;

  productDetails: HTMLDivElement;

  productName: HTMLHeadingElement;

  productDescription: HTMLDivElement;

  productCardSlider: HTMLDivElement; //

  productPrices: HTMLDivElement;

  price: HTMLSpanElement;

  discount: HTMLSpanElement;

  discountPrice: HTMLSpanElement;

  key: string;

  constructor(id: string, key: string) {
    super(id);
    this.key = key;
    this.pageWrapper.id = 'product-card-page';
    this.productCardContainer = createHtmlElement('div', 'product-card-container');
    this.imageElem = createHtmlElement('div', 'product-card-image');
    this.image = createHtmlElement('img');
    this.productCardContent = createHtmlElement('div', 'product-card-content');
    this.productDetails = createHtmlElement('div', 'product-card-details');
    this.productName = createHtmlElement('h3', 'product-card-name');
    this.productDescription = createHtmlElement('div', 'product-card-description');
    this.productCardSlider = createHtmlElement('div', 'product-card-slider');
    this.productPrices = createHtmlElement('div', 'product-card-prices');
    this.price = createHtmlElement('span', 'product-card-price');
    this.discount = createHtmlElement('span', 'product-card-discount');
    this.discountPrice = createHtmlElement('span', 'product-card-discount-price');
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    // header
    const headerComponents = new HeaderComponent();
    const { appName, logoContainer, logo, navBar, navigation, navItem, link } = headerComponents;
    this.addElemsToHeader(appName, logoContainer, navBar);
    appName.innerHTML = 'Ultimate ScriptSmith';
    logoContainer.append(logo);
    navBar.append(navigation);

    const isUserLoggedIn = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string);
    const logLink = isUserLoggedIn ? 'Log out' : 'Log in';
    const profileLink = isUserLoggedIn ? 'Profile' : false;
    const linkName = [logLink, 'Register', 'Back to main', 'Catalog', 'Basket', 'About Us', 'Profile'];

    navBar.className = 'nav-bar-catalog-page';
    navItem.className = 'nav-item';
    headerComponents.createNavigation(navigation, navItem, 6, link);

    const navLinksArr = Array.from(document.querySelectorAll('.nav-item a'));

    for (let i = 0; i < navLinksArr.length; i += 1) {
      navLinksArr[i].innerHTML = linkName[i];
      navLinksArr[i].setAttribute('href', routes[i]);
    }

    if (profileLink) {
      navigation.append(navItem.cloneNode(true));
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

    // main
    const cardImageModalWindow = new CardImageModalWindow('');
    const { modalWindowWrapper, modalWindowContentWrapper, imageWrapper, img, buttonContainer, closeModalWindowBtn } =
      cardImageModalWindow;
    this.addElemsToMain(modalWindowWrapper, this.productCardContainer);
    modalWindowWrapper.append(modalWindowContentWrapper);
    modalWindowContentWrapper.append(imageWrapper, buttonContainer);

    // modal window card image
    imageWrapper.append(img);
    buttonContainer.append(closeModalWindowBtn);

    this.productCardContainer.append(this.imageElem, this.productCardContent, this.productPrices);
    this.productCardContent.append(this.productDetails, this.productCardSlider);
    this.productCardSlider.innerHTML = 'A slider should be here';
    this.imageElem.append(this.image);
    this.productDetails.append(this.productName, this.productDescription);
    this.productPrices.append(this.price, this.discount, this.discountPrice);
    getToken(`${this.key}`);

    const modalImageWrapper = document.querySelector('.modal-window-wrapper-img') as HTMLDivElement;
    const pageBody = document.querySelector('body') as HTMLElement;
    addEventHandler('close-modal-button', 'click', () => {
      modalImageWrapper.classList.remove('active');
      pageBody.classList.remove('active');
    });

    addEventHandler('product-card-image', 'click', () => {
      modalImageWrapper.classList.add('active');
      pageBody.classList.add('active');
    });

    return this.pageWrapper;
  }
}
