import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import createHtmlElement from '../../utils/functions';
import getProductListByToken from '../../server-requests/catalog-product-page-requests/catalog-product-page-requests';

export default class CatalogProductPage extends Page {
  pageTitle: HTMLHeadingElement;

  productContainer: HTMLDivElement;

  imageElem: HTMLDivElement;

  image: HTMLImageElement;

  productDetails: HTMLDivElement;

  productName: HTMLDivElement;

  productDescription: HTMLDivElement;

  productPrices: HTMLDivElement;

  price: HTMLSpanElement;

  discount: HTMLSpanElement;

  discountPrice: HTMLSpanElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'catalog-product-page';
    this.pageTitle = createHtmlElement('h2', 'catalog-page-title', 'Catalog');
    this.productContainer = createHtmlElement('div', 'product-container');
    this.imageElem = createHtmlElement('div', 'product-image');
    this.image = createHtmlElement('img');
    this.productDetails = createHtmlElement('div', 'product-details');
    this.productName = createHtmlElement('h3', 'product-name');
    this.productDescription = createHtmlElement('div', 'product-description');
    this.productPrices = createHtmlElement('div', 'product-prices');
    this.price = createHtmlElement('span', 'price');
    this.discount = createHtmlElement('span', 'discount');
    this.discountPrice = createHtmlElement('span', 'discount-price');
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    // header
    const catalogPageHeader = new HeaderComponent();
    const { appName, navBar, navigation, navItem, link } = catalogPageHeader;
    navBar.className = 'nav-bar-catalog-page';

    this.addElemsToHeader(appName, this.pageTitle, navBar);
    appName.innerHTML = 'ScriptSmith';
    navBar.append(navigation);
    catalogPageHeader.createNavigation(navigation, navItem, 4, link);
    const navLinksNames = ['Profile', 'Back to main', 'Log in', 'Register'];
    const navLinksArr = Array.from(document.querySelectorAll('.nav-link'));
    navLinksArr.forEach((item, i) => {
      const linkItem = item;
      linkItem.innerHTML = navLinksNames[i];
    });

    // main
    getProductListByToken();

    this.addElemsToMain(this.productContainer);
    this.productContainer.append(this.imageElem, this.productDetails, this.productPrices);
    this.productDetails.append(this.productName, this.productDescription);
    this.productPrices.append(this.price, this.discount, this.discountPrice);
    this.imageElem.append(this.image);

    return this.pageWrapper;
  }
}
