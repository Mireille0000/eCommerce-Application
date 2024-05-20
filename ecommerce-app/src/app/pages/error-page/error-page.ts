import Page from '../../templates/page';
import createHtmlElement from '../../utils/functions';
import HeaderComponent from '../../components/header';

export default class ErrorPage extends Page {
  back: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.back = createHtmlElement('div', 'error-page');
  }

  renderPage(): HTMLDivElement {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    const headerCompInstance = new HeaderComponent();
    const headerElems = [
      headerCompInstance.appName,
      headerCompInstance.navBar,
      headerCompInstance.navigation,
      headerCompInstance.navItem,
      headerCompInstance.link,
    ];
    const [title, navigation, navList, navListItem, link] = headerElems;
    this.addElemsToHeader(title, navigation);
    navigation.append(navList);
    navList.append(navListItem);
    navListItem.append(link);

    link.innerHTML = 'Back to main';
    title.innerHTML = 'Ultimate ScriptSmith';
    this.addElemsToMain(this.back);
    this.back.innerHTML = 'ERROR 404. PAGE IS NOT FOUND';
    link.setAttribute('href', '#main-page');
    return this.pageWrapper;
  }
}
