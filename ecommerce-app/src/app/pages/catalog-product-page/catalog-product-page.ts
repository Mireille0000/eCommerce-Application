import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
// import FilteringForm from './product-list-manipulations/filtering-form';
import FilterForm from './product-list-manipulations/filtering-form';
import createHtmlElement from '../../utils/functions';
import getProductListByToken from '../../server-requests/catalog-product-page-requests/catalog-product-page-requests';

export default class CatalogProductPage extends Page {
  pageTitle: HTMLHeadingElement;

  productsWrapper: HTMLDivElement;

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
    this.productsWrapper = createHtmlElement('div', 'product-wrapper');
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
    const filteringForm = new FilterForm();
    const {
      filterContainer,
      title,
      filterOptions,
      fieldset,
      legend,
      checkboxContainer,
      label,
      input,
      buttons,
      applyButton,
      clearButton,
    } = filteringForm;

    this.addElemsToMain(this.productsWrapper, filterContainer);
    filterContainer.append(title, filterOptions, buttons);
    fieldset.append(legend, checkboxContainer);
    buttons.append(applyButton, clearButton);
    filteringForm.createFilterOptionsMenu(filterOptions, fieldset, 5);

    const optionsLegend = ['Price', 'Material', 'Size', 'Manufacturer', 'Color'];

    // options

    const filterAttributes = {
      color: ['Green', 'Red', 'Grey', 'Brown', 'Lead-colored', 'Black', 'Blue'],
      material: ['Wood', 'Iron', 'Stannum', 'Coton', 'Silk', 'Linen'],
      manufacturer: ['Humans', 'Elves', 'Dwarves'],
      price: ['0-5€', '6-18€', '19-25€'],
      size: ['M', 'XL'],
      discount: ['Discounted', 'Non-discounted'],
    };

    console.log(label, input, filterAttributes);

    const legendsArr = Array.from(document.querySelectorAll('.option-title'));
    legendsArr.forEach((item, index) => {
      const legendItem = item;
      legendItem.innerHTML = optionsLegend[index];
    });

    const checkboxes = Array.from(document.querySelectorAll('.checkbox-container'));
    checkboxes.forEach((item, i) => {
      const checkboxesItem = item;
      checkboxesItem.className = `${optionsLegend[i].toLowerCase()}-option`;
    });

    filteringForm.addInputs('price-option', input, label, filterAttributes.price.length, filterAttributes, 'price');
    filteringForm.addInputs(
      'material-option',
      input,
      label,
      filterAttributes.material.length,
      filterAttributes,
      'material'
    );
    filteringForm.addInputs('size-option', input, label, filterAttributes.size.length, filterAttributes, 'size');
    filteringForm.addInputs(
      'manufacturer-option',
      input,
      label,
      filterAttributes.manufacturer.length,
      filterAttributes,
      'manufacturer'
    );
    filteringForm.addInputs('color-option', input, label, filterAttributes.color.length, filterAttributes, 'color');

    this.productsWrapper.append(this.productContainer);
    this.productContainer.append(this.imageElem, this.productDetails, this.productPrices);
    this.productDetails.append(this.productName, this.productDescription);
    this.productPrices.append(this.price, this.discount, this.discountPrice);
    this.imageElem.append(this.image);
    getProductListByToken();

    return this.pageWrapper;
  }
}
