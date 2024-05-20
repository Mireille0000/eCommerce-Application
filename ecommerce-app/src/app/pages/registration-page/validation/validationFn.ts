export const conditionWord = [
  (value: string) => value.length >= 1,
  (value: string) => {
    const hasNoSpecialChars = !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(value);
    const hasOnlyDigits = !/\d/.test(value);
    return hasOnlyDigits && hasNoSpecialChars;
  },
];

export const conditionBirthDate = [
  (value: string) => {
    const [year, month, day] = value.split('.').map((str) => Number(str));
    const condition = !!(year > 999 && month > 0 && day > 0);
    return condition;
  },
  (value: string) => {
    const [year, month, day] = value.split('.').map((str) => Number(str));
    if (year && month && day) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isOldEnough =
        age > 13 || (age === 13 && today.getMonth() >= birthDate.getMonth() && today.getDate() >= birthDate.getDate());
      return isOldEnough;
    }
    return true;
  },
];

export const conditionEmail = [
  (value: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*([.]\w{2,3})+$/.test(value),
  (value: string) => /[@]{1}/.test(value),
  (value: string) => !/\s/.test(value),
];

export const conditionPassword = [
  (value: string) => value.length >= 8,
  (value: string) => /(?=.*[A-Z])/.test(value),
  (value: string) => /(?=.*[a-z])/.test(value),
  (value: string) => /(?=.*\d)/.test(value),
  (value: string) => /^\S*$/.test(value),
  (value: string) => /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(value),
];

export const conditionStreet = [(value: string) => value.length >= 2];

export const conditionHouseNumber = [
  (value: string) => /^\d/.test(value),
  (value: string) => !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(value),
];

export const conditionPostcode = [
  (value: string) => value.length === 5,
  (value: string) => {
    const hasNoSpecialChars = !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(value);
    const hasOnlyDigits = /^[0-9]+$/.test(value);
    return hasNoSpecialChars && hasOnlyDigits;
  },
];
