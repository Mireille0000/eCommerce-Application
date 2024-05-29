interface Attributes {
  name: string;
  value: string;
}

type ElemAttributes = Attributes[];

export default function createHtmlElement<T = HTMLElement>(
  newTag: string,
  newClass = '',
  text = '',
  attributes: ElemAttributes = []
): T {
  const newElem = document.createElement(`${newTag}`);
  if (newClass) newElem.className = `${newClass}`;
  if (text) newElem.innerHTML = `${text}`;
  if (attributes.length) {
    attributes.forEach((attribute) => newElem.setAttribute(attribute.name, attribute.value));
  }
  return newElem as T;
}

export function createDivElement(newClass = '', text = '', attributes: ElemAttributes = []): HTMLDivElement {
  return createHtmlElement('div', newClass, text, attributes);
}
export function createSpanElement(newClass = '', text = '', attributes: ElemAttributes = []): HTMLSpanElement {
  return createHtmlElement('span', newClass, text, attributes);
}
export function createLabelElement(newClass = '', text = '', attributes: ElemAttributes = []): HTMLLabelElement {
  return createHtmlElement('label', newClass, text, attributes);
}
export function createButtonElement(newClass = '', text = '', attributes: ElemAttributes = []): HTMLButtonElement {
  return createHtmlElement('button', newClass, text, attributes);
}
export function createInputElement(newClass = '', text = '', attributes: ElemAttributes = []): HTMLInputElement {
  return createHtmlElement('input', newClass, text, attributes);
}

export function addEventHandler(element: string, eventType: string, callback = () => {}) {
  const target = document.querySelector(`.${element}`);
  target?.addEventListener(`${eventType}`, callback);
}

export function createImage(source: File | string, alt: string, classImg: string, image = new Image()) {
  const newImage = image;
  newImage.src = `${source}`;
  newImage.alt = `${alt}`;
  newImage.className = `${classImg}`;
  return newImage;
}
