import createHtmlElement, {
  createDivElement,
  createLabelElement,
  createInputElement,
  createButtonElement,
} from '../../../utils/functions';

export default class FilterForm {
  filterContainer: HTMLDivElement;

  title: HTMLHeadingElement;

  filterOptions: HTMLDivElement;

  fieldset: HTMLFieldSetElement;

  legend: HTMLLegendElement;

  checkboxContainer: HTMLDivElement;

  label: HTMLLabelElement;

  input: HTMLInputElement;

  buttons: HTMLDivElement;

  applyButton: HTMLButtonElement;

  clearButton: HTMLButtonElement;

  constructor() {
    this.filterContainer = createDivElement('filter-container');
    this.title = createHtmlElement('h3', 'filter-title', 'Choose filter options');
    this.filterOptions = createDivElement('filtering-options');
    this.fieldset = createHtmlElement('fieldset');
    this.legend = createHtmlElement('legend', 'option-title');

    this.checkboxContainer = createDivElement('checkbox-container');
    this.label = createLabelElement('option-lable');
    this.input = createInputElement('input-option', '', [{ name: 'type', value: 'checkbox' }]);

    this.buttons = createDivElement('buttons-container');
    this.applyButton = createButtonElement('apply-button', 'Apply');
    this.clearButton = createButtonElement('clear-button', 'Clear');
  }

  createFilterOptionsMenu(container: HTMLElement, option: HTMLElement, numOfOptions: number) {
    const optionsLegend = ['Price', 'Material', 'Size', 'Manufacturer', 'Color'];
    const optionItem = option;
    for (let i = 0; i < numOfOptions; i += 1) {
      optionItem.className = `${optionsLegend[i].toLowerCase()}-fieldset`;
      container.appendChild(optionItem.cloneNode(true));
    }
  }

  addInputs(
    checkboxClass: string,
    input: HTMLInputElement,
    label: HTMLLabelElement,
    numOfInputs: number,
    dataAttributes: { [key: string]: string[] },
    attribute: string
  ) {
    const checkboxElem = document.querySelector(`.${checkboxClass}`) as HTMLFieldSetElement;
    const labelItem = label;
    for (let i = 0; i < numOfInputs; i += 1) {
      checkboxElem.appendChild(input.cloneNode(true));
      input.setAttribute(`data-${attribute}`, `${dataAttributes[attribute][i]}`);
      labelItem.innerHTML = dataAttributes[attribute][i];
      checkboxElem.appendChild(label.cloneNode(true));
      // labelItem.innerHTML = dataAttributes[attribute][i];
    }
  }
}
