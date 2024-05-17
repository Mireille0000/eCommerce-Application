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

export function addEventHandler(element: string, e: string, callback = () => {}) {
  const target = document.querySelector(`.${element}`);
  target?.addEventListener(`${e}`, callback);
}

export function createImage(source: File, alt: string, classImg: string, image = new Image()) {
  const newImage = image;
  newImage.src = `${source}`;
  newImage.alt = `${alt}`;
  newImage.className = `.${classImg}`;
  return newImage;
}
