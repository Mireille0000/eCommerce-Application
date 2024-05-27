import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import createHtmlElement from '../../utils/functions';

export default class CatalogProductPage extends Page {
  pageTitle: HTMLHeadingElement;

  productContainer: HTMLDivElement;

  imageElem: HTMLDivElement;

  productDetails: HTMLDivElement;

  productName: HTMLDivElement;

  productDescription: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'catalog-product-page';
    this.pageTitle = createHtmlElement('h2', 'catalog-page-title', 'Catalog');
    this.productContainer = createHtmlElement('div', 'product-container');
    this.imageElem = createHtmlElement('div', 'product-image');
    this.productDetails = createHtmlElement('div', 'product-details');
    this.productName = createHtmlElement('h3', 'product-name');
    this.productDescription = createHtmlElement('div', 'product-description');
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    // header
    const catalogPageHeader = new HeaderComponent();
    const headerElems = [
      catalogPageHeader.appName,
      catalogPageHeader.navBar,
      catalogPageHeader.navigation,
      catalogPageHeader.navItem,
      catalogPageHeader.link,
    ];
    const [appName, navBar, linksList, linkListItem, link] = headerElems;
    navBar.className = 'nav-bar-catalog-page';

    this.addElemsToHeader(appName, this.pageTitle, navBar);
    appName.innerHTML = 'ScriptSmith';
    navBar.append(linksList);
    catalogPageHeader.createNavigation(linksList, linkListItem, 4, link);
    const navLinksNames = ['Profile', 'Back to main', 'Log in', 'Register'];
    const navLinksArr = Array.from(document.querySelectorAll('.nav-link'));
    navLinksArr.forEach((item, i) => {
      const linkItem = item;
      linkItem.innerHTML = navLinksNames[i];
    });

    // main
    this.addElemsToMain(this.productContainer);
    this.productContainer.append(this.imageElem, this.productName, this.productDescription);

    return this.pageWrapper;
  }
}
