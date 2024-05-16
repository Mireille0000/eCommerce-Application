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

// Email validation

const isEmailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*([.]\w{2,3})+$/;
const hasArobase = /[@]{1}/g;
const hasWhitespaces = /\s/;
const errorMessages: Array<string> = [
  'Email should be in a proper format (e.g. user@example.com, to-user@example.fr etc.)',
  'Email should contain an arobase (@)',
  'Email should not contain any leading or trailing whitespaces',
];

function validationEmailInput(input: HTMLInputElement, hint: string) {
  const errorFields = Array.from(document.querySelectorAll(`.${hint}`));
  if (!isEmailFormat.test(input.value)) {
    errorFields.forEach((field, i) => {
      const errField = field;
      errField.innerHTML = errorMessages[i];
    });
    if (`${input.value}`.match(hasArobase)?.length === 1) {
      errorFields[1].innerHTML = '';
    }
    if (!hasWhitespaces.test(input.value)) {
      errorFields[2].innerHTML = '';
    }
  } else {
    errorFields.forEach((field) => {
      const errField = field;
      errField.innerHTML = '';
    });
  }
}

export function logInBtnEventHandler(input: HTMLInputElement, hint: string, buttonClass: string) {
  const logInButton = document.querySelector(`.${buttonClass}`);
  logInButton?.addEventListener('click', (e) => {
    validationEmailInput(input, hint);
    e.preventDefault();
  });
}

export function emailInputEventHandler(input: HTMLInputElement, inputClass: string, hint: string) {
  const inputField = document.querySelector(`.${inputClass}`);
  const errorFields = Array.from(document.querySelectorAll(`.${hint}`));
  inputField?.addEventListener('input', () => {
    validationEmailInput(input, hint);
    if (input.value.length === 0) {
      errorFields.forEach((field) => {
        const errField = field;
        errField.innerHTML = '';
      });
    }
  });
}
