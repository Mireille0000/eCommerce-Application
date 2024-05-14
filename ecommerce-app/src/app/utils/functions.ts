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
