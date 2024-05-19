// Email validation

export const isEmailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*([.]\w{2,3})+$/;
const hasArobase = /[@]{1}/g;
const hasWhitespaces = /\s/;
const errorMessages: Array<string> = [
  'Email should be in a proper format (e.g. user@example.com, to-user@example.fr etc.)',
  'Email should contain an arobase (@)',
  'Email should not contain any leading or trailing whitespaces',
];

function validateEmailInput(input: HTMLInputElement, hint: string) {
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

// Password validation

const errorMessagesPassword = [
  'Password must be at least 8 characters long',
  'Password must contain at least one uppercase letter (A-Z)',
  'Password must contain at least one lowercase letter (a-z)',
  'Password must contain at least one digit (0-9)',
  'Password must not contain leading or trailing whitespace',
  'Password must contain at least one special character (e.g., !@#$%^&*)',
];

export const isPasswordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
const hasUppercaseLetter = /(?=.*[A-Z])/;
const hasLowercaseLetter = /(?=.*[a-z])/;
const hasDigit = /(?=.*\d)/;
const hasNotWhitespaces = /^\S*$/;
const hasSpecialChar = /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/;

const passwordReExs = [
  isPasswordFormat,
  hasUppercaseLetter,
  hasLowercaseLetter,
  hasDigit,
  hasNotWhitespaces,
  hasSpecialChar,
];

function validatePasswordInput(input: HTMLInputElement, hint: string) {
  const passwordHintsArr = Array.from(document.querySelectorAll(`.${hint}`));
  const errorFields = Array.from(document.querySelectorAll(`.${hint}`));
  if (!isPasswordFormat.test(input.value)) {
    passwordHintsArr.forEach((field, i) => {
      const errField = field;
      errField.innerHTML = errorMessagesPassword[i];
    });
    passwordReExs.forEach((error, i) => {
      if (error.test(input.value)) {
        passwordHintsArr[i].innerHTML = '';
      } else {
        passwordHintsArr[i].innerHTML = errorMessagesPassword[i];
      }
    });
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
    validateEmailInput(input, hint);
    e.preventDefault();
  });
}

// Input Event Handler

type ValidateInputFn = (input: HTMLInputElement, hint: string) => void;

export function inputEventHandler(
  validateFunc: ValidateInputFn,
  input: HTMLInputElement,
  inputClass: string,
  hint: string
) {
  const inputField = document.querySelector(`.${inputClass}`);
  const errorFields = Array.from(document.querySelectorAll(`.${hint}`));
  inputField?.addEventListener('input', () => {
    validateFunc(input, hint);
    if (input.value.length === 0) {
      errorFields.forEach((field) => {
        const errField = field;
        errField.innerHTML = '';
      });
    }
  });
}

export function passwordInputEventHandler(input: HTMLInputElement, inputClass: string, hint: string) {
  inputEventHandler(validatePasswordInput, input, inputClass, hint);
}

export function emailInputEventHandler(input: HTMLInputElement, inputClass: string, hint: string) {
  inputEventHandler(validateEmailInput, input, inputClass, hint);
}
