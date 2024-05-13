export default function createHtmlElement<T = HTMLElement>(newTag: string, newClass = '', text = ''): T {
  const newElem = document.createElement(`${newTag}`);
  newElem.className = `${newClass}`;
  newElem.innerHTML = `${text}`;
  return newElem as T;
}
