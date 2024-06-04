import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import FilterForm from './product-list-manipulations/filtering-form';
import createHtmlElement, { createButtonElement, addEventHandler } from '../../utils/functions';
import getProductListByToken from '../../server-requests/catalog-product-page-requests/catalog-product-page-requests';
import SortingMenu from './product-list-manipulations/sorting-menu';
import SearchingForm from './product-list-manipulations/searching-form';
import CategoriesNavigation from './product-list-manipulations/category-navigation-menu';
import productContainerElem from './product-list-manipulations/functions-catalog-page';

const routes = ['#log-in-page', '#registration-page', '#main-page', '#profile-page']; // change profile page id if needed

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
    // const { appName, navBar, navigation, navItem, link } = catalogPageHeader;
    // navBar.className = 'nav-bar-catalog-page';

    // this.addElemsToHeader(appName, this.pageTitle, navBar);
    // appName.innerHTML = 'Ultimate  ScriptSmith';
    // navBar.append(navigation);
    // catalogPageHeader.createNavigation(navigation, navItem, 4, link);
    // const navLinksNames = ['Profile', 'Back to main', 'Log in', 'Register'];
    // const navLinksArr = Array.from(document.querySelectorAll('.nav-link'));
    // navLinksArr.forEach((item, i) => {
    //   const linkItem = item;
    //   linkItem.innerHTML = navLinksNames[i];
    // });

    const { appName, logoContainer, logo, navBar, navigation, navItem, link } = catalogPageHeader;
    this.addElemsToHeader(appName, logoContainer, this.pageTitle, navBar);
    logoContainer.append(logo);
    navBar.className = 'nav-bar-catalog-page';
    navBar.append(navigation);
    const isUserLoggedIn = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string);
    const logLink = isUserLoggedIn ? 'Log out' : 'Log in';
    const profileLink = isUserLoggedIn ? 'Profile' : false;
    console.log(isUserLoggedIn, logLink, profileLink);
    const linkName = [logLink, 'Register', 'Back to main', 'Profile'];
    navigation.append(navItem);
    navItem.className = 'nav-item';
    for (let i = 0; i < 2; i += 1) {
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
    const searchFormInstance = new SearchingForm();
    searchFormInstance.renderSearchingForm(this.productListManipulatings);
    const categoriesNavigation = new CategoriesNavigation();
    const categoriesNamesDefault = [
      'All  >',
      'Staff  >',
      '', // Elemental damage
      'Mage robe  >',
      '', // Enchanted mage robe
      'Cauldron  >',
      '', // Foggy cauldron
    ];

    const categoriesClassNamesDefault = [
      'categories-list-item all-categories',
      'categories-list-item staff-category',
      'categories-list-item elemental-damage-category',
      'categories-list-item mage-robe-category',
      'categories-list-item enchanted-robes-category',
      'categories-list-item cauldron-category',
      'categories-list-item foggy-cauldron-category',
    ];
    categoriesNavigation.renderCategoriesNavElem(this.mainWrapper, categoriesNamesDefault, categoriesClassNamesDefault);

    // const inputSearchField = document.querySelector('.search-input');
    addEventHandler('search-input', 'click', () => {
      searchFormInstance.searchButton.disabled = false;
    });

    addEventHandler('search-input', 'focusout', () => {
      setTimeout(() => {
        searchFormInstance.searchButton.disabled = true;
      }, 1000);
    });

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
