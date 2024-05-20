import Page from './templates/page';
import LogInPage from './pages/log-in-page/log-in';
import MainPage from './pages/main-page/main';
import RegistrationPage from './pages/registration-page/registration';
// import { routes } from './pages/main-page/main';

const Pages = {
  LogInPageId: 'log-in-page',
  MainPageId: 'main-page',
  RegisterPageId: 'registration-page',
};

export default class App {
  initialPage: MainPage;

  static renderAppPage(id: string) {
    document.body.innerHTML = '';
    let page: Page | null = null;

    if (id === Pages.LogInPageId) {
      page = new LogInPage('log-in-page');
    } else if (id === Pages.RegisterPageId) {
      page = new RegistrationPage('registration-page');
    } else if (id === Pages.MainPageId) {
      page = new MainPage('main-page');
    }

    if (page) {
      const pageToRender = page.renderPage();
      document.body.append(pageToRender);
    }
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
  }

  changeRoute() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      console.log(this);
      return App.renderAppPage(hash);
    });
  }

  renderPage() {
    window.location.hash = 'main-page';
    this.changeRoute();
  }
}
