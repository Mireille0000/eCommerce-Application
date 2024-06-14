import Page from '../../../templates/page';
import createHtmlElement from '../../../utils/functions';

export default class ModalWindowIndicator extends Page {
  modalWindowWrapper: HTMLDivElement;

  modalWindowContentWrapper: HTMLDivElement;

  text: HTMLParagraphElement;

  indicator: HTMLElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'progress-indicator';
    this.modalWindowWrapper = createHtmlElement('div', 'wrapper-progress-indicator');
    this.modalWindowContentWrapper = createHtmlElement('div', 'content-progress-indicator');
    this.text = createHtmlElement('p', 'progress-indicator-text', 'IN PROGRESS...');
    this.indicator = createHtmlElement('i', 'fa-solid fa-frog fa-bounce');
    this.indicator.setAttribute(
      'style',
      '--fa-bounce-start-scale-x: 1; --fa-bounce-start-scale-y: 1; --fa-bounce-jump-scale-x: 1; --fa-bounce-jump-scale-y: 1; --fa-bounce-land-scale-x: 1; --fa-bounce-land-scale-y: 1;'
    );
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.modalWindowWrapper);
    return this.pageWrapper;
  }
}
