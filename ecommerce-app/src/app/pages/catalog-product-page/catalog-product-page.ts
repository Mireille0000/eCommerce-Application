import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import FilterForm from './product-list-manipulations/filtering-form';
import createHtmlElement, { createButtonElement, addEventHandler } from '../../utils/functions';
import getProductListByToken from '../../server-requests/catalog-product-page-requests/catalog-product-page-requests';
import SortingMenu from './product-list-manipulations/sorting-menu';
import productContainerElem from './product-list-manipulations/functions-catalog-page';

export default class CatalogProductPage extends Page {
  pageTitle: HTMLHeadingElement;

  productListManipulatings: HTMLDivElement;

  manipulationgButtons: HTMLDivElement;

  filterButton: HTMLButtonElement;

  sortButton: HTMLButtonElement;

  productsWrapper: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'catalog-product-page';
    this.pageTitle = createHtmlElement('h2', 'catalog-page-title', 'Catalog');
    this.productListManipulatings = createHtmlElement('div', 'manipulatings');
    this.manipulationgButtons = createHtmlElement('div', 'manipulating-buttons');
    this.filterButton = createButtonElement('filter-button', 'Filter');
    this.sortButton = createButtonElement('sort-button', 'Sort');
    this.productsWrapper = createHtmlElement('div', 'product-wrapper');
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

    this.addElemsToMain(this.productListManipulatings, this.productsWrapper);
    this.productListManipulatings.append(this.manipulationgButtons, filterContainer);
    this.manipulationgButtons.append(this.filterButton, this.sortButton);
    const sortMenuInstance = new SortingMenu();
    sortMenuInstance.renderSortingMenu(this.manipulationgButtons);

    filterContainer.append(title, filterOptions, buttons);
    fieldset.append(legend, checkboxContainer);
    buttons.append(applyButton, clearButton);
    filteringForm.createFilterOptionsMenu(filterOptions, fieldset, 5);

    const optionsLegend = ['Price', 'Material', 'Size', 'Manufacturer', 'Color'];

    const filterAttributes = {
      color: ['Green', 'Red', 'Grey', 'Brown', 'Lead-colored', 'Black', 'Blue'],
      material: ['Wood', 'Iron', 'Stannum', 'Coton', 'Silk', 'Linen'],
      manufacturer: ['Humans', 'Elves', 'Dwarves'],
      price: ['Low(0-5€)', 'Middle(6-18€)', 'High(19-25€)'],
      size: ['M', 'XL'],
      discount: ['Discounted', 'Non-discounted'],
    };

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

    productContainerElem(this.productsWrapper);
    getProductListByToken();

    // fiter button
    addEventHandler('filter-button', 'click', () => {
      const filters = document.querySelector('.filter-container') as HTMLDivElement;
      filters.classList.toggle('active');
      console.log('Change active state of the elem');
    });

    // sort button
    addEventHandler('sort-button', 'click', () => {
      console.log('click');
      const sortMenu = document.querySelector('.sorting-menu') as HTMLDivElement;
      sortMenu.classList.toggle('active');
    });

    // clear button
    addEventHandler('clear-button', 'click', () => {
      const inputsArr = Array.from(document.querySelectorAll('.input-option')) as HTMLInputElement[];
      inputsArr.forEach((item: HTMLInputElement) => {
        const inputItem = item;
        inputItem.checked = false;
        console.log(inputItem.checked);
      });
    });

    return this.pageWrapper;
  }
}
