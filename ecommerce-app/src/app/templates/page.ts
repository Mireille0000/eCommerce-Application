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
    this.pageWrapper = document.createElement('div');
    this.pageWrapper.className = 'wrapper';
    this.header = document.createElement('header');
    this.headerWrapper = document.createElement('div');
    this.headerWrapper.className = 'wrapper-header';
    this.appName = document.createElement('h1');
    this.main = document.createElement('main');
    this.mainWrapper = document.createElement('div');
    this.mainWrapper.className = 'wrapper-main';
    this.footer = document.createElement('footer');
    this.footerWrapper = document.createElement('div');
  }

  addElemsToHeader(...elems: Array<HTMLElement>) {
    this.header.append(this.headerWrapper);
    return this.headerWrapper.append(...elems);
  }

  addElemsToMain(...elems: Array<HTMLElement>) {
    this.main.append(this.mainWrapper);
    return this.mainWrapper.append(...elems);
  }

  addElemsToFooter(...elems: Array<HTMLElement>) {
    this.footer.append(this.footerWrapper);
    return this.footerWrapper.append(...elems);
  }

  renderPage() {
    return this.pageWrapper;
  }
}
