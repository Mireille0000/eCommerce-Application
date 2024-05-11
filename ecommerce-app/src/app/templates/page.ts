export default abstract class Page {
  pageWrapper: HTMLDivElement;

  header: HTMLElement;

  headerWrapper: HTMLDivElement;

  main: HTMLElement;

  mainWrapper: HTMLDivElement;

  footer: HTMLElement;

  footerWrapper: HTMLDivElement;

  constructor() {
    this.pageWrapper = document.createElement('div');
    this.pageWrapper.className = 'wrapper';
    this.header = document.createElement('head');
    this.headerWrapper = document.createElement('div');
    this.main = document.createElement('main');
    this.mainWrapper = document.createElement('div');
    this.footer = document.createElement('footer');
    this.footerWrapper = document.createElement('div');
  }

  addElemsToHeader(...elems: Array<HTMLElement>) {
    this.header.append(this.headerWrapper);
    return this.headerWrapper.append(...elems);
  }

  addElemsToMain(...elems: Array<HTMLElement>) {
    this.main.append(...elems);
  }

  addElemsToFooter(...elems: Array<HTMLElement>) {
    this.footer.append(...elems);
  }

  renderPage() {
    return this.pageWrapper;
  }
}
