import createHtmlElement from '../../../utils/functions';

export default class SortingMenu {
  sortingContainer: HTMLDivElement;

  option: HTMLSpanElement;

  constructor() {
    this.sortingContainer = createHtmlElement('div', 'sorting-menu');
    this.option = createHtmlElement('span');
  }

  renderSortingMenu(sortBtn: HTMLElement) {
    sortBtn.append(this.sortingContainer);
    const optionsText = ['By name', 'By price(from the lowest one)', 'By price(from the highest one)'];
    const optionsClassName = [
      'sort-option sort-name',
      'sort-option sort-price-lowest',
      'sort-option sort-price-highest',
    ];

    for (let i = 0; i < 3; i += 1) {
      this.option.innerHTML = optionsText[i];
      this.option.className = optionsClassName[i];
      this.sortingContainer.appendChild(this.option.cloneNode(true));
    }
  }
}
