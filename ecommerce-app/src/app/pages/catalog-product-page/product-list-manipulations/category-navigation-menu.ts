import createHtmlElement from '../../../utils/functions';

export default class CategoriesNavigation {
  categoriesNavContainer: HTMLDivElement;

  title: HTMLHeadingElement;

  categoriesList: HTMLUListElement;

  categoriesListItem: HTMLLIElement;

  constructor() {
    this.categoriesNavContainer = createHtmlElement('div', 'nav-categories-container');
    this.title = createHtmlElement('h4', 'categories-title', 'Categories');
    this.categoriesList = createHtmlElement('ul', 'categories-list');
    this.categoriesListItem = createHtmlElement('li');
  }

  renderCategoriesNavElem(
    toAppendElem: HTMLElement,
    categoriesNames: Array<string>,
    categoriesClassNames: Array<string>
  ) {
    toAppendElem.append(this.categoriesNavContainer);
    this.categoriesNavContainer.append(this.title, this.categoriesList);
    // const categoriesNames = ['Staff', 'Mage robe', 'Cauldron'];
    // const categoriesClassNames = [
    //   'categories-list-item staff-category',
    //   'categories-list-item mage-robe-category',
    //   'categories-list-item cauldron-category',
    // ];
    for (let i = 0; i < categoriesNames.length; i += 1) {
      this.categoriesListItem.innerHTML = categoriesNames[i];
      this.categoriesListItem.className = categoriesClassNames[i];
      this.categoriesList.appendChild(this.categoriesListItem.cloneNode(true));
    }
  }
}
