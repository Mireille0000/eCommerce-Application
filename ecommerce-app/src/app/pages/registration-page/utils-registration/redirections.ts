export default function redirectionRegistration() {
  let currentURL = window.location.href;
  if (!currentURL.includes('page')) {
    currentURL += `${currentURL[currentURL.length - 1] === '/' ? '' : '/'}registration-page`;
    window.history.pushState({}, '', currentURL);
  }
}
