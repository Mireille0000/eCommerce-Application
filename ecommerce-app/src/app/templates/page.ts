import { PageElements } from '../../app/utils/types';
import createHtmlElement from '../../app/utils/functions';

export default abstract class Page {
  pageWrapper: HTMLDivElement;

  header: HTMLElement;

  headerWrapper: HTMLDivElement;

  appName: HTMLHeadingElement;

  main: HTMLElement;

  mainWrapper: HTMLDivElement;

  footer: HTMLElement;

  footerWrapper: HTMLDivElement;

  constructor() {
    this.pageWrapper = createHtmlElement('div', 'wrapper');
    this.header = createHtmlElement('header');
    this.headerWrapper = createHtmlElement('div', 'wrapper-header');
    this.appName = createHtmlElement('h1');
    this.main = createHtmlElement('main'); //
    this.mainWrapper = createHtmlElement('div', 'wrapper-main');
    this.footer = createHtmlElement('footer');
    this.footerWrapper = createHtmlElement('div');
  }

  addElemsToHeader(...elems: PageElements) {
    this.header.append(this.headerWrapper);
    return this.headerWrapper.append(...elems);
  }

  addElemsToMain(...elems: PageElements) {
    this.main.append(this.mainWrapper);
    return this.mainWrapper.append(...elems);
  }

  addElemsToFooter(...elems: PageElements) {
    this.footer.append(this.footerWrapper);
    return this.footerWrapper.append(...elems);
  }

  renderPage() {
    return this.pageWrapper;
  }
}
