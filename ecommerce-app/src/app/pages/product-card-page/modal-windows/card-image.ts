import Page from '../../../templates/page';
import createHtmlElement from '../../../utils/functions';

export default class CardImageModalWindow extends Page {
  modalWindowWrapper: HTMLDivElement;

  modalWindowContentWrapper: HTMLDivElement;

  imageWrapper: HTMLDivElement;

  img: HTMLImageElement;

  buttonContainer: HTMLDivElement;

  closeModalWindowBtn: HTMLButtonElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'image-card-modal-window';
    this.modalWindowWrapper = createHtmlElement('div', 'modal-window-wrapper-img');
    this.modalWindowContentWrapper = createHtmlElement('div', 'img-modal-window');
    this.imageWrapper = createHtmlElement('div', 'image-container');
    this.img = createHtmlElement('img');
    this.buttonContainer = createHtmlElement('div', 'close-modal-container');
    this.closeModalWindowBtn = createHtmlElement('button', 'close-modal-button', 'Close');
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.modalWindowWrapper);
    return this.pageWrapper;
  }
}
