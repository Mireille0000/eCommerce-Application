import { createDivElement, createInputElement, createButtonElement } from '../../../utils/functions';

export default class SearchingForm {
  searchContainer: HTMLDivElement;

  searchInput: HTMLInputElement;

  searchButton: HTMLButtonElement;

  constructor() {
    this.searchContainer = createDivElement('search-container');
    this.searchInput = createInputElement('search-input', 'Search...', [
      { name: 'type', value: 'search' },
      { name: 'placeholder', value: 'Search...' },
    ]);
    this.searchButton = createButtonElement('search-button', 'Search');
  }

  renderSearchingForm(toAppendElem: HTMLElement) {
    toAppendElem.append(this.searchContainer);
    this.searchContainer.append(this.searchInput, this.searchButton);
  }
}
