import Page from './templates/page';
import LogInPage from './pages/log-in-page/log-in';
import MainPage from './pages/main-page/main';
import RegistrationPage from './pages/registration-page/registration';
import ErrorPage from './pages/error-page/error-page';
import CatalogProductPage from './pages/catalog-product-page/catalog-product-page';
import PersonalRender from './pages/personal-info-page/personal-info';
import ProductCardPage from './pages/product-card-page/product-card-page';
// import { routes } from './pages/main-page/main';

const enum Pages {
  LogInPageId = 'log-in-page',
  MainPageId = 'main-page',
  RegisterPageId = 'registration-page',
  CatalogPageId = 'catalog-product-page',
  DetailedProductPageId = 'detailed-product-page',
  ProfilePageId = 'profile-page', // change if needed
}

export default class App {
  initialPage: MainPage;

  static renderAppPage(id: string, productKey?: string) {
    document.body.innerHTML = '';
    let page: Page | null = null;
    const isUserLoggedIn = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string);
    if (id === Pages.LogInPageId && !isUserLoggedIn) {
      page = new LogInPage(id);
    } else if (id === Pages.LogInPageId && isUserLoggedIn) {
      window.location.hash = 'main-page';
      //   page = new MainPage('main-page');
    } else if (id === Pages.RegisterPageId && !isUserLoggedIn) {
      page = new RegistrationPage(id);
    } else if (id === Pages.RegisterPageId && isUserLoggedIn) {
      window.location.hash = 'main-page';
    } else if (id === Pages.MainPageId) {
      page = new MainPage(id);
    } else if (id === Pages.CatalogPageId) {
      page = new CatalogProductPage(id);
    } else if (id === Pages.DetailedProductPageId && productKey) {
      console.log('I happened');
      page = new ProductCardPage(id, productKey);
    } else if (id === Pages.ProfilePageId && isUserLoggedIn) {
      page = new PersonalRender(id);
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
      if (hash.includes('/')) {
        const [hashname, productKey] = hash.split('/');
        return App.renderAppPage(hashname, productKey);
      }
      console.log(this);
      return App.renderAppPage(hash);
    });
  }

  renderPage() {
    if (window.location.hash.slice(1) === 'main-page') {
      window.location.hash = '';
      window.location.hash = 'main-page';
    } else {
      window.location.hash = 'main-page';
    }
    this.changeRoute();
  }
}
