import Page from '../../templates/page';
import HeaderComponent from '../../components/header';
import createHtmlElement, { createDivElement, createImage } from '../../utils/functions';
import devPhoto from '../../../assets/images/team-members-dev.png';
import leadPhoto from '../../../assets/images/team-members-lead.jpg';
// import gitHubIcon from '../../../assets/images/png-clipart-black-cat-github-logo-repository-computer-icons-github-white-cat-like-mammal-thumbnail.png';

export const routes = [
  '#log-in-page',
  '#registration-page',
  '#main-page',
  '#catalog-product-page',
  '#profile-page',
  '#basket-page',
];

export default class AboutUsPage extends Page {
  pageTitle: HTMLHeadingElement;

  teamMembersContainer: HTMLDivElement;

  developerContainer: HTMLDivElement;

  photoDevContainer: HTMLDivElement;

  devHeader: HTMLHeadingElement;

  leadHeader: HTMLHeadingElement;

  devInfo: HTMLImageElement;

  leadInfo: HTMLDivElement;

  leadContainer: HTMLDivElement;

  photoLeadContainer: HTMLDivElement;

  photoLead: HTMLImageElement;

  bioDev: HTMLParagraphElement;

  devContribution: HTMLUListElement;

  leadContribution: HTMLUListElement;

  bioLead: HTMLParagraphElement;

  ghDev: HTMLParagraphElement;

  ghLead: HTMLParagraphElement;

  footerRSSLink: HTMLDivElement;

  constructor(id: string) {
    super(id);
    this.pageWrapper.id = 'about-us-page';
    this.pageTitle = createHtmlElement('h2', 'Our Team');
    this.teamMembersContainer = createDivElement('team-members-container');

    this.developerContainer = createDivElement('dev-container');
    this.photoDevContainer = createDivElement('photo-dev-container');
    this.devInfo = createHtmlElement('div', 'dev-info');
    this.devHeader = createHtmlElement('h4', '', 'Evgeny Kuptsov (front-end developer)');
    this.bioDev = createHtmlElement('p', 'bio-dev');
    this.devContribution = createHtmlElement('ul', 'contribution-dev');
    this.ghDev = createHtmlElement('p', 'gh-dev');

    this.leadContainer = createDivElement('lead-container');
    this.leadInfo = createDivElement('lead-info');
    this.leadHeader = createHtmlElement('h4', '', 'Tamara Gasanova (front-end developer, team-lead)');
    this.photoLeadContainer = createDivElement('photo-lead-container');
    this.photoLead = createHtmlElement('img', 'photo-lead');
    this.bioLead = createHtmlElement('p', 'bio-lead');
    this.leadContribution = createHtmlElement('ul', 'contribution-lead');
    this.ghLead = createHtmlElement('p', 'gh-lead');

    this.footerRSSLink = createDivElement('footer-rss-link-container');
  }

  renderPage() {
    document.body.append(this.pageWrapper);
    this.pageWrapper.append(this.header, this.main, this.footer);
    // header
    const catalogPageHeader = new HeaderComponent();
    const { appName, logoContainer, logo, navBar, navigation, navItem, link } = catalogPageHeader;
    this.addElemsToHeader(appName, logoContainer, this.pageTitle, navBar);

    logoContainer.append(logo);

    navBar.className = 'nav-bar-catalog-page';
    navBar.append(navigation);
    const isUserLoggedIn = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string);
    const logLink = isUserLoggedIn ? 'Log out' : 'Log in';
    const profileLink = isUserLoggedIn ? 'Profile' : false;
    const linkName = [logLink, 'Register', 'Back to main', 'Catalog', 'Profile', 'Basket'];
    navigation.append(navItem);
    navItem.className = 'nav-item';
    for (let i = 0; i < linkName.length - 2; i += 1) {
      navigation.appendChild(navItem.cloneNode(true));
    }

    if (profileLink) {
      navigation.append(navItem.cloneNode(true));
    }
    const navListItemsArr = Array.from(document.querySelectorAll('.nav-item'));

    for (let i = 0; i < navListItemsArr.length; i += 1) {
      navListItemsArr[i].appendChild(link.cloneNode(true));
    }
    const navLinksArr = Array.from(document.querySelectorAll('.nav-item a'));

    for (let i = 0; i < navLinksArr.length; i += 1) {
      navLinksArr[i].innerHTML = linkName[i];
      navLinksArr[i].setAttribute('href', routes[i]);
    }

    const logInLink = navLinksArr[0];

    logInLink.addEventListener('click', (event) => {
      event.preventDefault();
      if (isUserLoggedIn) {
        localStorage.clear();
        window.location.hash = '';
        window.location.hash = 'main-page';
      } else {
        window.location.hash = 'log-in-page';
      }
    });
    appName.innerHTML = 'Ultimate ScriptSmith';

    // main
    this.teamMembersContainer.append(this.developerContainer, this.leadContainer);
    this.developerContainer.append(this.photoDevContainer, this.devInfo);
    this.devInfo.append(this.devHeader, this.bioDev, this.devContribution, this.ghDev);
    this.bioDev.innerHTML =
      'Engineer specializing in Radio-electronic systems and complexes. Working as a Radioelectronic Equipment and Instrumentation Adjuster';
    const liContribution = createHtmlElement('li', 'li-contribution');
    const devContribution = [
      'Registration page (design, functionality)',
      'Profile page (design, functionality)',
      'Basket page (design, functionality)',
      'Product details page (functionality related to cart page)',
      'Reusable functions for creating html elements',
    ];
    this.devContribution.innerHTML = '<b>Contribution: </b>';
    for (let i = 0; i < devContribution.length; i += 1) {
      liContribution.innerHTML = `${devContribution[i]}`;
      this.devContribution.appendChild(liContribution.cloneNode(true));
    }
    const photoDev = createImage(devPhoto, 'Evgeny Kuptsov', 'dev-photo');
    this.photoDevContainer.append(photoDev);
    this.ghDev.innerHTML = 'GitHub: ';
    // const ghIcon = createImage(gitHubIcon, 'GitHub icon', 'gh-icon');

    // this.ghDev.append(ghIcon);

    this.leadContainer.append(this.photoLeadContainer, this.leadInfo);
    this.leadInfo.append(this.leadHeader, this.bioLead, this.leadContribution, this.ghLead);
    const photoLead = createImage(leadPhoto, 'Tamara Gasanova', 'lead-photo');
    this.photoLeadContainer.append(photoLead);
    this.bioLead.innerHTML =
      'Linguist with two foreign languages skills (french, english), working as a translator (with french mostly), Developer (learning web-development)';
    const leadContribution = [
      'Log in page (design, functionality)',
      'Catalog page (design, functionality)',
      'Product details page (design, modal window)',
      'Routing (functionality)',
      'Header (design, functionality)',
    ];
    this.leadContribution.innerHTML = '<b>Contribution: </b>';
    for (let i = 0; i < leadContribution.length; i += 1) {
      liContribution.innerHTML = `${leadContribution[i]}`;
      this.leadContribution.appendChild(liContribution.cloneNode(true));
    }
    this.addElemsToMain(this.teamMembersContainer);

    // footer
    this.addElemsToFooter(this.footerRSSLink);
    const linkRSS = createHtmlElement('a', 'rss-link') as HTMLLinkElement;
    this.footerRSSLink.append(linkRSS);
    linkRSS.href = '';

    return this.pageWrapper;
  }
}
