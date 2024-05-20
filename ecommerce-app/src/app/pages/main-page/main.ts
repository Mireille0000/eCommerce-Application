import Page from '../../templates/page';
import createHtmlElement from '../../utils/functions';

export default class MainPage extends Page {
  info: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.info = createHtmlElement('div');
  }

  renderPage(): HTMLDivElement {
    this.pageWrapper.id = 'main-page';
    return this.pageWrapper;
  }
}
