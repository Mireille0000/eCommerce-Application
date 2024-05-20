import Page from './templates/page';
import LogInPage from './pages/log-in-page/log-in';
import MainPage from './pages/main-page/main';

const Pages = {
  LogInPageId: 'log-in',
  MainPageId: 'main-page',
};

export default class App extends Page {
  initialPage: LogInPage;

  constructor(id: string) {
    super(id);
    this.initialPage = new LogInPage('log-in-page');
  }

  static renderAppPage(id: string) {
    document.body.innerHTML = '';
    let page: Page | null = null;

    if (id === Pages.LogInPageId) {
      page = new LogInPage('log-in-page');
    } else {
      page = new MainPage('main-page');
    }

    if (page) {
      const pageToRender = page.renderPage();
      document.body.append(pageToRender);
    }
  }

  renderPage(): HTMLDivElement {
    const initialPage = this.initialPage.renderPage();
    return initialPage;
  }
}
