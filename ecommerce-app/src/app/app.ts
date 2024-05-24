import Page from './templates/page';
import LogInPage from './pages/log-in-page/log-in';
import MainPage from './pages/main-page/main';
import RegistrationPage from './pages/registration-page/registration';
import ErrorPage from './pages/error-page/error-page';
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
    const isUserLoggedIn = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string);
    if (id === Pages.LogInPageId && !isUserLoggedIn) {
      page = new LogInPage('log-in-page');
    } else if (id === Pages.LogInPageId && isUserLoggedIn) {
      window.location.hash = 'main-page';
      //   page = new MainPage('main-page');
    } else if (id === Pages.RegisterPageId) {
      page = new RegistrationPage('registration-page');
    } else if (id === Pages.MainPageId) {
      page = new MainPage('main-page');
    } else {
      page = new ErrorPage('error-page');
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
    console.log('I got called');
    if (window.location.hash.slice(1) === 'main-page') {
      window.location.hash = '';
      window.location.hash = 'main-page';
    } else {
      window.location.hash = 'main-page';
    }
    this.changeRoute();
  }
}
