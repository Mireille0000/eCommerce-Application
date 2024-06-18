import Page from '../../templates/page';
import createHtmlElement, {
  createButtonElement,
  createDivElement,
  createImage,
  createInputElement,
  createLabelElement,
  createSpanElement,
  createH2Element,
  createH3Element,
} from '../../utils/functions';
import {
  Address,
  AddressTypes,
  Addresses,
  CurrAdrs,
  CustomerData,
  FieldsEdit,
  StringArr,
  arrConditionFn,
} from '../../utils/types';
import {
  AdrsType,
  ClssNms,
  Txt,
  adrsCondFn,
  adrsErr,
  adrsFieldMap,
  basicCondFn,
  basicErr,
  contErr,
  contactCondFn,
  fieldMapping,
  msgPassFail,
  msgPassSuccess,
  msgUpdateData,
  msgUpdateFail,
  securCondFn,
  securErr,
  securFields,
} from './constants/constants';

import edit from '../../../assets/images/edit.svg';
import deleteAddress from '../../../assets/images/delete_address.svg';
import toogle from '../../../assets/images/toggle.svg';
import CustomerLoader from '../../server-requests/personal-info-request/getPersonalData';
import updateCustomerField, {
  updatePasswordField,
} from '../../server-requests/personal-info-request/updatePersonalData';
import { createMsgRegAcc } from '../registration-page/utils-registration/functions-registration';
import checkCustomer from '../../server-requests/log-in-form-requests/login-form-requests';
import HeaderComponent from '../../components/header';

import { Action, ActionEdit, ActionsEdit, AdrsEdit, AdrssEdit } from './constants/types';
import { updateAdrssFields } from '../../server-requests/personal-info-request/updateAdrs';

const routes = [
  '#log-in-page',
  '#registration-page',
  '#catalog-product-page',
  '#main-page',
  '#about-us-page',
  '#basket-page',
];

interface FieldUser {
  field: string;
  value: string;
}

type FieldsUser = FieldUser[];

const getPersonalData = (customerData: CustomerData) => {
  const {
    email,
    firstName,
    lastName,
    dateOfBirth,
    addresses,
    defaultBillingAddressId,
    defaultShippingAddressId,
    shippingAddressIds,
    billingAddressIds,
    id,
    version,
  } = customerData;

  // {
  //   'shipping': ['hgfhg5'],
  //   'Default Billing': ['hjkytu'],
  //   ...
  // }
  const addressTypes: AddressTypes = {};
  if (shippingAddressIds) {
    addressTypes[Txt.ADRS_SHIP] = shippingAddressIds;
  }
  if (billingAddressIds) {
    addressTypes[Txt.ADRS_BILL] = billingAddressIds;
  }
  if (defaultShippingAddressId) {
    addressTypes[Txt.ADRS_DEF_SHIP] = [defaultShippingAddressId];
  }
  if (defaultBillingAddressId) {
    addressTypes[Txt.ADRS_DEF_BILL] = [defaultBillingAddressId];
  }

  addresses.forEach((currAddress) => {
    const addressId = currAddress.id;
    const updatedAddress = { ...currAddress };

    Object.entries(addressTypes).forEach(([key, value]) => {
      value.forEach((currId) => {
        if (currId === addressId) {
          if (!updatedAddress.addressType) {
            updatedAddress.addressType = [];
          }
          updatedAddress.addressType.push(key);
        }
      });
    });

    const index = addresses.findIndex((addr) => addr.id === addressId);
    addresses[index] = updatedAddress;
  });

  return { firstName, lastName, dateOfBirth, email, addresses, id, version };
};

class PersonalRender extends Page {
  numberAddrs: number;

  UserData!: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    addresses: Addresses;
    id: string;
    version: string;
    currentPassword?: string;
    newPassword?: string;
  };

  UserDataInit!: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    addresses: Addresses;
  };

  constructor(id: string) {
    super(id);
    this.pageWrapper.classList.add(ClssNms.WRAPPER_PI);
    this.main.classList.add(ClssNms.MAIN);
    this.mainWrapper.classList.add(ClssNms.WRAPPER_MAIN_PI);
    this.headerWrapper.classList.add('header-personal');
    this.numberAddrs = 0;
  }

  private createTitlePage() {
    const titlePage = createDivElement(ClssNms.TITLE);
    const titlePageHeading = createH2Element(ClssNms.TITLE_HEADING, Txt.MAIN_TITLE);
    titlePage.appendChild(titlePageHeading);
    return titlePage;
  }

  private createContainer(titleContainer: string) {
    const container = createDivElement(ClssNms.CONTAINER);
    const title = createDivElement(ClssNms.CONTAINER_TITLE);
    const titleTxt = createH3Element(ClssNms.CONTAINER_TTL_HEAD, titleContainer);
    title.append(titleTxt);
    container.append(title);
    return container;
  }

  private createSaveBtn(fields: FieldsUser, isPass = false) {
    const PIContainerSave = createDivElement('PI__container-save');
    const UInfoBtnSave = createButtonElement('user-info__btn-save', 'Save', [{ name: 'disabled', value: 'true' }]);
    UInfoBtnSave.addEventListener('click', async (event) => {
      event.preventDefault();

      const editFields: FieldsEdit = {};
      fields.forEach(({ field }) => {
        const fieldName = fieldMapping[field];
        if (fieldName && this.UserDataInit[fieldName] !== this.UserData[fieldName]) {
          if (this.UserData[fieldName]) {
            editFields[fieldName] = this.UserData[fieldName] || '';
          }
        }
      });

      if (isPass) {
        updatePasswordField(this.UserData, editFields)
          .then(() => {
            this.UserData.version += 1;
            setTimeout(() => createMsgRegAcc(msgPassSuccess), 0);
            checkCustomer(this.UserData.email, this.UserData.newPassword || '', 'auth-error-message').catch(
              (err) => err.message
            );
          })
          .catch(() => setTimeout(() => createMsgRegAcc(msgPassFail), 0));
      } else {
        updateCustomerField(this.UserData, editFields)
          .then(() => setTimeout(() => createMsgRegAcc(msgUpdateData), 0))
          .catch(() => setTimeout(() => createMsgRegAcc(msgUpdateFail), 0));
      }
      UInfoBtnSave.setAttribute('disabled', 'true');
    });

    PIContainerSave.appendChild(UInfoBtnSave);
    return PIContainerSave;
  }

  // [{field: 'Email', value: 'example@gmail.com'}, ...]
  private createPIContainer(
    titleContainer: string,
    fields: FieldsUser,
    arrCondFn: arrConditionFn[],
    errMsgsWords: StringArr[]
  ) {
    const container = this.createContainer(titleContainer);
    const saveBtn = this.createSaveBtn(fields);

    fields.forEach(({ field, value }, index) => {
      const currField = {
        field,
        value,
      };
      const userInfo = createDivElement(ClssNms.U_INFO);
      const userInfoFieldWrap = createDivElement(ClssNms.U_INFO_FIELD_WRAP);
      const userInfoField = createDivElement(ClssNms.U_INFO_FIELD);

      const userInfoDescrWrap = createDivElement(ClssNms.U_INFO_DESCR_WRAP);
      const userInfoDescr = createLabelElement(ClssNms.U_INFO_DESCR, currField.field);
      userInfoDescrWrap.appendChild(userInfoDescr);

      const userInfoCntntWrap = createDivElement(ClssNms.U_INFO_CONTENT_WRAP);
      const userInfoCntnt = createSpanElement(ClssNms.U_INFO_CONTENT, currField.value);
      const errMsgElem = createLabelElement('user-info__err-msg');
      userInfoCntntWrap.appendChild(userInfoCntnt);
      userInfoField.append(userInfoDescrWrap, userInfoCntntWrap);
      userInfoFieldWrap.appendChild(userInfoField);

      const userInfoEdit = createDivElement(ClssNms.U_INFO_EDIT);
      const userInfoEditBtn = createButtonElement(ClssNms.U_INFO_EDIT_BTN);

      userInfoEditBtn.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const openEditInput = userInfoField.querySelector(
          `.${ClssNms.U_INFO_CONTENT_INPUT}`
        ) as HTMLInputElement | null;
        if (!openEditInput) {
          const userInfoCntntSpan = userInfoField.querySelector(`.${ClssNms.U_INFO_CONTENT}`);
          const inputUserInfoCntnt = createInputElement(ClssNms.U_INFO_CONTENT_INPUT, '', [
            { name: 'value', value: currField.value },
          ]);
          userInfoCntntWrap.appendChild(errMsgElem);

          inputUserInfoCntnt.addEventListener('input', () => {
            for (let i = 0; i < arrCondFn[index].length; i += 1) {
              const inptValue = inputUserInfoCntnt.value;
              const errMsg = errMsgsWords[index][i];
              if (!arrCondFn[index][i](inptValue)) {
                errMsgElem.textContent = errMsg;
                errMsgElem.style.display = 'block';
                userInfoEditBtn.classList.add(`${ClssNms.U_INFO_EDIT_BTN_DISABLED}`);
                userInfoEditBtn.setAttribute('disabled', 'true');
                break;
              } else {
                errMsgElem.textContent = '';
                errMsgElem.style.display = '';
                userInfoEditBtn.classList.remove(`${ClssNms.U_INFO_EDIT_BTN_DISABLED}`);
                userInfoEditBtn.removeAttribute('disabled');
              }
            }
          });
          userInfoCntntSpan?.remove();
          userInfoCntntWrap.appendChild(inputUserInfoCntnt);
        } else {
          const inputValue = openEditInput.value;
          if (inputValue !== currField.value) {
            const btnSave = container.querySelector('.user-info__btn-save');
            btnSave?.removeAttribute('disabled');
          }

          const fieldName = fieldMapping[field];
          if (fieldName) {
            this.UserData[fieldName] = inputValue;
          }

          currField.value = openEditInput.value;
          openEditInput.remove();
          const userInfoContent = createSpanElement(ClssNms.U_INFO_CONTENT, currField.value);
          userInfoCntntWrap.appendChild(userInfoContent);
        }
      });

      const imgEdit = createImage(edit, Txt.ALT_EDIT, ClssNms.IMG_EDIT);
      userInfoEditBtn.appendChild(imgEdit);
      userInfoEdit.appendChild(userInfoEditBtn);

      userInfo.append(userInfoFieldWrap, userInfoEdit);
      container.appendChild(userInfo);
    });

    container.appendChild(saveBtn);
    return container;
  }

  private copyInitData() {
    const adrssesInit: Addresses = [];

    this.UserData.addresses.forEach((adrs) => {
      const objAdrs: Address = {
        addressType: JSON.parse(JSON.stringify(adrs.addressType)),
        id: adrs.id,
        streetName: adrs.streetName,
        streetNumber: adrs.streetNumber,
        postalCode: adrs.postalCode,
        city: adrs.city,
        country: adrs.country,
      };
      adrssesInit.push(objAdrs);
    });

    this.UserDataInit = {
      firstName: this.UserData.firstName,
      lastName: this.UserData.lastName,
      dateOfBirth: this.UserData.dateOfBirth,
      email: this.UserData.email,
      currentPassword: '',
      newPassword: '',
      addresses: adrssesInit,
    };
  }

  private createSaveBtnAdrs() {
    const PIContainerSave = createDivElement('PI__container-save');
    const UInfoBtnSave = createButtonElement('user-info__btn-save-adrs', 'Save', [{ name: 'disabled', value: 'true' }]);
    const fields = ['id', 'streetName', 'streetNumber', 'postalCode', 'city', 'addressType'];
    const adrsFieldMapKey = Object.keys(adrsFieldMap);
    const successEditAdrs = ['Success!', 'Data updated successfully.'];
    const failEditAdrs = ['Failure :(', 'Something went wrong...'];

    UInfoBtnSave.addEventListener('click', async (event) => {
      event.preventDefault();
      const addressesEdit: AdrssEdit = [];
      const addressesTypeEdit: ActionsEdit = [];

      this.UserData.addresses.forEach((currAdrs, index) => {
        const currTypes = currAdrs.addressType as string[];
        const initTypes = this.UserDataInit.addresses[index].addressType as string[];
        if (JSON.stringify(currTypes) !== JSON.stringify(initTypes)) {
          currTypes.forEach((currType) => {
            let action: Action;
            if (!initTypes.includes(currType)) {
              if (currType === 'Billing') {
                action = 'addBillingAddressId';
              } else if (currType === 'Shipping') {
                action = 'addShippingAddressId';
              } else if (currType === 'Default Shipping') {
                action = 'setDefaultShippingAddress';
              } else {
                action = 'setDefaultBillingAddress';
              }
              const typeAction = {
                action,
                addressId: this.UserData.addresses[index].id,
              };
              addressesTypeEdit.push(typeAction);
            }
          });

          initTypes.forEach((currType) => {
            let action: Action;
            if (!currTypes.includes(currType)) {
              if (currType === 'Billing') {
                action = 'removeBillingAddressId';
              } else if (currType === 'Shipping') {
                action = 'removeShippingAddressId';
              } else if (currType === 'Default Shipping') {
                action = 'setDefaultShippingAddress';
              } else {
                action = 'setDefaultBillingAddress';
              }
              const typeAction: ActionEdit = {
                action,
                addressId: this.UserData.addresses[index].id,
              };
              if (action === 'setDefaultBillingAddress' || action === 'setDefaultShippingAddress') {
                delete typeAction.addressId;
              }

              addressesTypeEdit.push(typeAction);
            }
          });
        }

        const adrsObj: AdrsEdit = {};

        for (let i = 0; i < fields.length; i += 1) {
          const fieldName = adrsFieldMap[adrsFieldMapKey[i]];
          const userDataValue = currAdrs[fieldName];
          const initDataValue = this.UserDataInit.addresses[index][fieldName];
          if (userDataValue !== initDataValue) {
            adrsObj.city = currAdrs.city;
            adrsObj.postalCode = currAdrs.postalCode;
            adrsObj.streetName = currAdrs.streetName;
            adrsObj.streetNumber = currAdrs.streetNumber;
            adrsObj.id = currAdrs.id;
            break;
          }
        }
        if (Object.keys(adrsObj).length) {
          addressesEdit.push(adrsObj);
        }
      });
      const { id: idUser } = this.UserData;

      updateAdrssFields(addressesEdit, addressesTypeEdit, this.UserData, idUser)
        .then(() => {
          this.copyInitData();
          setTimeout(() => createMsgRegAcc(successEditAdrs), 0);
        })
        .catch(() => {
          setTimeout(() => createMsgRegAcc(failEditAdrs), 0);
        });

      UInfoBtnSave.setAttribute('disabled', 'true');
    });
    // const UInfoBtnNewAdrs = createButtonElement('user-info_btn-new-adrs', 'New Adress');
    // UInfoBtnNewAdrs.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   const adrsCont = document.querySelector('.adress-container') as HTMLDivElement;
    //   // const
    //   // DataAddresses: Addresses,
    //   // arrCondFn: arrConditionFn[],
    //   // errMsgsWords: StringArr[],
    //   // container: HTMLDivElement
    //   const DataAdrs = [
    //     {
    //       id: '',
    //       streetName: '',
    //       streetNumber: '',
    //       postalCode: '',
    //       city: '',
    //       country: 'Germany',
    //       // addressType?: string[],
    //     },
    //   ];
    //   this.createFieldAdrss(DataAdrs, adrsCondFn, adrsErr, adrsCont);
    // });

    // PIContainerSave.append(UInfoBtnNewAdrs, UInfoBtnSave);
    PIContainerSave.appendChild(UInfoBtnSave);
    return PIContainerSave;
  }

  private createAdrsContainer(currAdrs: Address) {
    const { city, streetName, streetNumber, postalCode, addressType } = currAdrs;
    const UInfoAdrsContainer = createDivElement(ClssNms.U_INFO_ADRS_CONTAINER);
    const UInfoAdrsWrap = createDivElement(ClssNms.U_INFO_ADRS_WRAP);
    const UInfoAdrs = createSpanElement(
      ClssNms.U_INFO_ADRS,
      `${Txt.ADRS_COUNTRY}, ${city}, ${streetName} ${streetNumber}, ${postalCode}`
    );
    UInfoAdrsWrap.appendChild(UInfoAdrs);

    const UInfoAdrsTypeWrap = createDivElement(ClssNms.U_INFO_ADRS_TYPE_WRAP);
    const currAdrsType = addressType ? addressType.join(', ') : '';
    const UInfoAdrsType = createSpanElement(ClssNms.U_INFO_ADRS_TYPE, currAdrsType);
    UInfoAdrsTypeWrap.appendChild(UInfoAdrsType);
    UInfoAdrsContainer.append(UInfoAdrsWrap, UInfoAdrsTypeWrap);
    return UInfoAdrsContainer;
  }

  private checkAdrsType(UInfoEditBtn: HTMLButtonElement, container: HTMLDivElement, isActive = false) {
    const errElem = container.querySelector('.user-info__err-msg-type') as HTMLElement | null;
    const errMsg = 'The field must not be empty.';
    const emptyType = container.querySelector('.user-info__content-adrs-type-wrap');
    if (errElem) {
      if (!emptyType || isActive) {
        errElem.textContent = errMsg;
        errElem.style.display = 'block';
        UInfoEditBtn.classList.add(`${ClssNms.U_INFO_EDIT_BTN_DISABLED}`);
        UInfoEditBtn.setAttribute('disabled', 'true');
      } else {
        errElem.textContent = '';
        errElem.style.display = '';
        UInfoEditBtn.classList.remove(`${ClssNms.U_INFO_EDIT_BTN_DISABLED}`);
        UInfoEditBtn.removeAttribute('disabled');
      }
    }
  }

  private addType(
    typeCont: HTMLDivElement | HTMLInputElement,
    openBtnListType: HTMLButtonElement | null,
    typeAdd: string,
    arrCurrTypes: string[],
    UInfoEditBtn: HTMLButtonElement,
    container: HTMLDivElement
  ) {
    if (typeAdd) {
      const UInfoCntntAdrsTypeWrap = createDivElement(ClssNms.U_INFO_CONTENT_ADRS_TYPE_WRAP);
      const UInfoCntntAdrsType = createDivElement(ClssNms.U_INFO_CONTENT_ADRS_TYPE, typeAdd);

      const UInfoCntntAdrsTypeDelete = createButtonElement(ClssNms.U_INFO_CONTENT_ADRS_TYPE_BTN_DEL);
      UInfoCntntAdrsTypeDelete.addEventListener('click', () => {
        UInfoCntntAdrsTypeWrap.remove();
        const indexTypeDel = arrCurrTypes.indexOf(typeAdd);
        arrCurrTypes.splice(indexTypeDel, 1);
        const typeDefault = `Default ${typeAdd}`;
        if ((typeAdd === AdrsType.BILLING || typeAdd === AdrsType.SHIPPING) && arrCurrTypes.includes(typeDefault)) {
          const DefElemDelete = Array.from(typeCont.querySelectorAll(`.${ClssNms.U_INFO_CONTENT_ADRS_TYPE}`)).filter(
            (currTypeElem) => currTypeElem.textContent === typeDefault
          )[0].parentElement;
          DefElemDelete?.remove();
          const indexTypeDefaultDel = arrCurrTypes.indexOf(typeDefault);
          arrCurrTypes.splice(indexTypeDefaultDel, 1);
        }
        this.checkAdrsType(UInfoEditBtn, container);
      });
      UInfoCntntAdrsTypeWrap.append(UInfoCntntAdrsType, UInfoCntntAdrsTypeDelete);
      if (openBtnListType) {
        typeCont.insertBefore(UInfoCntntAdrsTypeWrap, openBtnListType);
      } else {
        typeCont.appendChild(UInfoCntntAdrsTypeWrap);
      }
    }
  }

  private addAndRemoveDefaultState(currValueTypes: string[], index: number) {
    const allfieldsType = Array.from(document.querySelectorAll(`.${ClssNms.U_INFO_ADRS_TYPE}`));
    const findTypes = currValueTypes.filter(
      (currValueType) => currValueType === AdrsType.BILLING_DEFAULT || currValueType === AdrsType.SHIPPING_DEFAULT
    );
    allfieldsType.forEach((fieldType) => {
      const elem = fieldType;
      const fieldTypeTxt = fieldType.textContent?.split(', ');
      findTypes.forEach((findType) => {
        if (fieldTypeTxt?.includes(findType)) {
          const indDel = fieldTypeTxt.indexOf(findType);
          fieldTypeTxt.splice(indDel, 1);
          elem.textContent = fieldTypeTxt.join(', ');
        }
      });
    });
    findTypes.forEach((findType) => {
      this.UserData.addresses.forEach(({ addressType: adrsTypes }, indexAdrs) => {
        if (indexAdrs !== index && adrsTypes && adrsTypes.includes(findType)) {
          const indDel = adrsTypes.indexOf(findType);
          this.UserData.addresses[indexAdrs].addressType?.splice(indDel, 1);
        }
      });
      if (!this.UserData.addresses[index].addressType?.includes(findType)) {
        this.UserData.addresses[index].addressType?.push(findType);
        const commonType = findType.split(' ')[1];
        if (!this.UserData.addresses[index].addressType?.includes(commonType)) {
          this.UserData.addresses[index].addressType?.push(commonType);
        }
      }
    });
  }

  private openAdrs(DataAdrs: Address, index: number, arrCondFn: arrConditionFn[], errMsgsWords: StringArr[]) {
    const { city, streetName, streetNumber, postalCode, addressType } = DataAdrs;
    const adrsType = addressType ? addressType.join(', ') : '';
    const currAddrs: CurrAdrs = {
      [Txt.COUNTRY_DSCR]: 'Germany',
      [Txt.SITY_DSCR]: city,
      [Txt.STREET_DSCR]: streetName,
      [Txt.STREET_NUMB_DSCR]: streetNumber,
      [Txt.POSTAL_CODE_DSCR]: postalCode,
      [Txt.ADRS_TYPE_DSCR]: adrsType,
    };

    const UInfoAdrsOpen = createDivElement(ClssNms.U_INFO_ADRS_OPEN);
    Object.entries(currAddrs).forEach(([key, value], indexField) => {
      const currValue: string | undefined = value;
      const currValueObj = { currValue };
      let currValueTypes: string[] = [];

      const UInfo = createDivElement(ClssNms.U_INFO);
      const UInfoFieldWrap = createDivElement(ClssNms.U_INFO_FIELD_WRAP);
      const UInfoDescrWrap = createDivElement(ClssNms.U_INFO_DESCR_WRAP);
      const UInfoDescr = createDivElement(ClssNms.U_INFO_DESCR, key);
      UInfoDescrWrap.appendChild(UInfoDescr);

      const UInfoContentWrap = createDivElement(ClssNms.U_INFO_CONTENT_WRAP);
      const UInfoContent = createSpanElement(ClssNms.U_INFO_CONTENT, currValueObj.currValue);
      const errMsgElem = createLabelElement('user-info__err-msg-type');
      UInfoContentWrap.append(UInfoContent, errMsgElem);
      UInfoFieldWrap.append(UInfoDescrWrap, UInfoContentWrap);

      const UInfoEdit = createDivElement(ClssNms.U_INFO_EDIT);
      const UInfoEditBtn = createButtonElement(ClssNms.U_INFO_EDIT_BTN);
      if (currValueObj.currValue === Txt.ADRS_COUNTRY) {
        UInfoEditBtn.setAttribute('disabled', 'true');
        UInfoEditBtn.classList.add('disabled-country');
      }
      UInfoEditBtn.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const UInfoOpenListType = UInfoFieldWrap.querySelector(`.${ClssNms.U_INFO_OPEN_LIST_TYPE}`);

        const openEditInput = UInfoContentWrap.querySelector(`.${ClssNms.U_INFO_CONTENT_INPUT}`) as HTMLElement | null;
        if (!openEditInput) {
          const userInfoCntntSpan = UInfoContentWrap.querySelector(`.${ClssNms.U_INFO_CONTENT}`);
          let inputUserInfoCntnt: HTMLDivElement | HTMLInputElement;
          if (key === Txt.ADRS_TYPE_DSCR) {
            inputUserInfoCntnt = createDivElement(ClssNms.U_INFO_CONTENT_INPUT);
            inputUserInfoCntnt.classList.add('user-info__content-input-type');
            (this.UserData.addresses[index].addressType as string[]).forEach((adrs) => {
              if (adrs !== ', ' && adrs) {
                currValueTypes.push(adrs);
                this.addType(inputUserInfoCntnt, null, adrs, currValueTypes, UInfoEditBtn, UInfoContentWrap);
              }
            });

            const UInfoCntntInpOpenBtn = createButtonElement(ClssNms.U_INFO_CONTENT_INPUT_OPEN_BTN);

            inputUserInfoCntnt.addEventListener('click', () => {
              let UInfoOpenListTypeInput = UInfoFieldWrap.querySelector(`.${ClssNms.U_INFO_OPEN_LIST_TYPE}`);

              if (UInfoOpenListTypeInput) {
                UInfoOpenListTypeInput.remove();
              } else {
                const strAdrsTypes = Array.from(
                  inputUserInfoCntnt.querySelectorAll(`.${ClssNms.U_INFO_CONTENT_ADRS_TYPE}`)
                ).map((item) => item.textContent);
                UInfoOpenListTypeInput = createDivElement(ClssNms.U_INFO_OPEN_LIST_TYPE);
                const UInfoOpenNoOptions = createDivElement(ClssNms.U_INFO_OPEN_NO_OPT, Txt.NO_OPTIONS);
                UInfoOpenListTypeInput.appendChild(UInfoOpenNoOptions);

                Object.values(AdrsType).forEach((type) => {
                  if (!strAdrsTypes.includes(type)) {
                    UInfoOpenNoOptions?.remove();
                    const typeElem = createDivElement(ClssNms.U_INFO_OPEN_TYPE_ELEM, type);
                    typeElem.addEventListener('click', () => {
                      this.checkAdrsType(UInfoEditBtn, UInfoContentWrap, false);

                      errMsgElem.textContent = '';
                      errMsgElem.style.display = 'none';
                      UInfoEditBtn.classList.remove(`${ClssNms.U_INFO_EDIT_BTN_DISABLED}`);
                      UInfoEditBtn.removeAttribute('disabled');
                      const addTypeForDefault = type.split(' ')[1];
                      currValueTypes.push(type);

                      this.addType(
                        inputUserInfoCntnt,
                        UInfoCntntInpOpenBtn,
                        type,
                        currValueTypes,
                        UInfoEditBtn,
                        UInfoContentWrap
                      );

                      if (type === AdrsType.BILLING_DEFAULT || type === AdrsType.SHIPPING_DEFAULT) {
                        if (!currValueTypes.includes(addTypeForDefault)) {
                          const typeElemDelete = Array.from(
                            UInfoFieldWrap.querySelectorAll(`.${ClssNms.U_INFO_OPEN_TYPE_ELEM}`)
                          ).filter((currTypeElem) => currTypeElem.textContent === addTypeForDefault)[0];
                          typeElemDelete?.remove();
                          this.addType(
                            inputUserInfoCntnt,
                            UInfoCntntInpOpenBtn,
                            addTypeForDefault,
                            currValueTypes,
                            UInfoEditBtn,
                            UInfoContentWrap
                          );
                          currValueTypes.push(addTypeForDefault);
                        }
                      }
                      typeElem.remove();
                    });
                    UInfoOpenListTypeInput?.appendChild(typeElem);
                  }
                });

                UInfoFieldWrap.appendChild(UInfoOpenListTypeInput);
              }
            });
            const UInfoCntntInpOpenBtnImg = createImage(toogle, Txt.ALT_TOGGLE, ClssNms.IMG_TOGGLE);
            UInfoCntntInpOpenBtn.appendChild(UInfoCntntInpOpenBtnImg);
            inputUserInfoCntnt.appendChild(UInfoCntntInpOpenBtn);
          } else {
            inputUserInfoCntnt = createInputElement(ClssNms.U_INFO_CONTENT_INPUT);
            UInfoContentWrap.appendChild(errMsgElem);
            inputUserInfoCntnt.addEventListener('input', () => {
              for (let i = 0; i < arrCondFn[indexField].length; i += 1) {
                const inptValue = (inputUserInfoCntnt as HTMLInputElement).value;
                const errMsg = errMsgsWords[indexField][i];
                if (!arrCondFn[indexField][i](inptValue)) {
                  errMsgElem.textContent = errMsg;
                  errMsgElem.style.display = 'block';
                  UInfoEditBtn.classList.add(`${ClssNms.U_INFO_EDIT_BTN_DISABLED}`);
                  UInfoEditBtn.setAttribute('disabled', 'true');
                  break;
                } else {
                  errMsgElem.textContent = '';
                  errMsgElem.style.display = '';
                  UInfoEditBtn.classList.remove(`${ClssNms.U_INFO_EDIT_BTN_DISABLED}`);
                  UInfoEditBtn.removeAttribute('disabled');
                }
              }
            });

            inputUserInfoCntnt.setAttribute('value', currValueObj.currValue || '');
          }

          userInfoCntntSpan?.remove();
          UInfoContentWrap.appendChild(inputUserInfoCntnt);
        } else {
          UInfoOpenListType?.remove();
          switch (currValueObj.currValue) {
            case city:
              this.UserData.addresses[index].city = (openEditInput as HTMLInputElement).value;
              break;
            case streetName:
              this.UserData.addresses[index].streetName = (openEditInput as HTMLInputElement).value;
              break;
            case streetNumber:
              this.UserData.addresses[index].streetNumber = (openEditInput as HTMLInputElement).value;
              break;
            case postalCode:
              this.UserData.addresses[index].postalCode = (openEditInput as HTMLInputElement).value;
              break;
            case addressType?.join(', '):
              this.UserData.addresses[index].addressType = currValueTypes;
              break;
            default:
              break;
          }
          const currAdrsType = (openEditInput as HTMLInputElement).value || currValueTypes.join(', ');
          if (currAdrsType !== currValueObj.currValue) {
            const btnSaveAdrs = document.querySelector('.user-info__btn-save-adrs') as HTMLButtonElement | null;
            btnSaveAdrs?.removeAttribute('disabled');
          }

          currValueObj.currValue = currAdrsType;
          if (currValueTypes.length) {
            this.addAndRemoveDefaultState(currValueTypes, index);
          }
          openEditInput.remove();

          const userInfoContent = createSpanElement(ClssNms.U_INFO_CONTENT, currValueObj.currValue);
          UInfoContentWrap.appendChild(userInfoContent);
          currValueTypes = [];
        }
      });
      const imgEdit = createImage(edit, Txt.ALT_EDIT, ClssNms.IMG_EDIT);
      UInfoEditBtn.appendChild(imgEdit);
      UInfoEdit.appendChild(UInfoEditBtn);

      UInfo.append(UInfoFieldWrap, UInfoEdit);
      UInfoAdrsOpen.append(UInfo);
    });

    return UInfoAdrsOpen;
  }

  private createFieldAdrss(
    DataAddresses: Addresses,
    arrCondFn: arrConditionFn[],
    errMsgsWords: StringArr[],
    container: HTMLDivElement
  ) {
    DataAddresses.forEach((DataAdrs, index) => {
      const userAddress = createDivElement(ClssNms.U_ADRS);
      const userInfo = createDivElement(ClssNms.U_INFO);
      const UInfoAdrsInfo = createDivElement(ClssNms.U_INFO_ADRS_INFO);
      const UInfoAdrsNumberWrap = createDivElement(ClssNms.U_INFO_ADRS_NUMBER_WRAP);
      const UInfoAdrsNumber = createLabelElement(
        ClssNms.U_INFO_ADRS_NUMBER,
        `${Txt.ADRS_DSCR} #${(this.numberAddrs += 1)}`
      );
      UInfoAdrsNumberWrap.appendChild(UInfoAdrsNumber);

      const UInfoAdrsContainer = this.createAdrsContainer(DataAdrs);
      UInfoAdrsInfo.append(UInfoAdrsNumberWrap, UInfoAdrsContainer);

      const UInfoBtns = createDivElement(ClssNms.U_INFO_BTNS);
      const UInfoDelAdrs = createDivElement(ClssNms.U_INFO_DELETE_ADDRESS);
      const UInfoDelAdrsBtn = createDivElement(ClssNms.U_INFO_DELETE_ADDRESS_BTN);
      const imgDelAdrs = createImage(deleteAddress, Txt.ALT_DELETE_ADRS, ClssNms.IMG_DELETE_ADRS);
      UInfoDelAdrsBtn.appendChild(imgDelAdrs);
      UInfoDelAdrs.appendChild(UInfoDelAdrsBtn);
      UInfoDelAdrsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const indxDelete = index;
        const { id } = this.UserData.addresses[indxDelete];
        const { id: idUser } = this.UserData;
        const successEditAdrs = ['Success!', 'Data updated successfully.'];
        const failEditAdrs = ['Failure :(', 'Something went wrong...'];

        const actionDelete: ActionEdit = {
          action: 'removeAddress',
          addressId: id,
        };

        updateAdrssFields([], [actionDelete], this.UserData, idUser)
          .then(() => {
            userAddress.remove();
            this.UserData.addresses.splice(indxDelete, 1);
            this.UserDataInit.addresses.splice(indxDelete, 1);
            setTimeout(() => createMsgRegAcc(successEditAdrs), 0);
          })
          .catch(() => {
            setTimeout(() => createMsgRegAcc(failEditAdrs), 0);
          });
      });

      const UInfoToggle = createDivElement(ClssNms.U_INFO_TOGGLE);
      const UInfoToggleBtn = createButtonElement(ClssNms.U_INFO_TOGGLE_BTN);
      let currOpenAdress = this.openAdrs(DataAdrs, index, arrCondFn, errMsgsWords);

      UInfoToggleBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const updateAdrsType = currOpenAdress.querySelectorAll(`.${ClssNms.U_INFO_CONTENT}`)[5];
        if (updateAdrsType) {
          const updateTxt = this.UserData.addresses[index].addressType?.join(', ') as string;
          updateAdrsType.textContent = updateTxt;
        }

        const openAdrsElem = userAddress.querySelector(`.${ClssNms.U_INFO_ADRS_OPEN}`) as HTMLElement;
        if (!openAdrsElem) {
          const deleteAdrsContainer = userAddress.querySelector(`.${ClssNms.U_INFO_ADRS_CONTAINER}`);
          deleteAdrsContainer?.remove();
          userAddress.appendChild(currOpenAdress);
          setTimeout(() => currOpenAdress.classList.add(ClssNms.ADRS_OPEN), 10);
        } else {
          openAdrsElem.style.overflow = 'hidden';
          currOpenAdress = this.openAdrs(DataAdrs, index, arrCondFn, errMsgsWords);
          const currUInfoAdrsContainer = this.createAdrsContainer(this.UserData.addresses[index]);
          openAdrsElem.classList.remove(ClssNms.ADRS_OPEN);
          UInfoToggleBtn.setAttribute('disabled', 'true');
          setTimeout(() => {
            if (!openAdrsElem.classList.contains(ClssNms.ADRS_OPEN)) {
              UInfoToggleBtn.removeAttribute('disabled');
              openAdrsElem.remove();
              UInfoAdrsInfo.appendChild(currUInfoAdrsContainer);
              openAdrsElem.style.overflow = '';
            }
          }, 500);
        }
      });

      const imgToggle = createImage(toogle, Txt.ALT_TOGGLE, ClssNms.IMG_TOGGLE);
      UInfoToggleBtn.appendChild(imgToggle);
      UInfoToggle.appendChild(UInfoToggleBtn);
      UInfoBtns.append(UInfoDelAdrs, UInfoToggle);

      userInfo.append(UInfoAdrsInfo, UInfoBtns);

      userAddress.appendChild(userInfo);
      container.append(userAddress);
    });
  }

  private createPIContainerAddress(DataAddresses: Addresses, arrCondFn: arrConditionFn[], errMsgsWords: StringArr[]) {
    const container = this.createContainer(Txt.ADRSS_TITLE);
    container.classList.add('adress-container');

    this.createFieldAdrss(DataAddresses, arrCondFn, errMsgsWords, container);

    const saveBtn = this.createSaveBtnAdrs();
    container.appendChild(saveBtn);

    return container;
  }

  private createSecurityContainer(
    titleContainer: string,
    fields: FieldsUser,
    arrCondFn: arrConditionFn[],
    errMsgsWords: StringArr[]
  ) {
    const container = this.createContainer(titleContainer);
    const saveBtn = this.createSaveBtn(fields, true);

    fields.forEach(({ field, value }, index) => {
      const currField = {
        field,
        value: '',
      };
      const userInfo = createDivElement(ClssNms.U_INFO);
      const userInfoFieldWrap = createDivElement(ClssNms.U_INFO_FIELD_WRAP);
      const userInfoField = createDivElement(ClssNms.U_INFO_FIELD);

      const userInfoDescrWrap = createDivElement(ClssNms.U_INFO_DESCR_WRAP);
      const userInfoDescr = createLabelElement(ClssNms.U_INFO_DESCR, currField.field);
      userInfoDescrWrap.appendChild(userInfoDescr);

      const userInfoCntntWrap = createDivElement(ClssNms.U_INFO_CONTENT_WRAP);
      const userInfoCntnt = createSpanElement(ClssNms.U_INFO_CONTENT, value);
      const errMsgElem = createLabelElement('user-info__err-msg');
      userInfoCntntWrap.appendChild(userInfoCntnt);
      userInfoField.append(userInfoDescrWrap, userInfoCntntWrap);
      userInfoFieldWrap.appendChild(userInfoField);

      const userInfoEdit = createDivElement(ClssNms.U_INFO_EDIT);
      const userInfoEditBtn = createButtonElement(ClssNms.U_INFO_EDIT_BTN);

      userInfoEditBtn.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const openEditInput = userInfoField.querySelector(
          `.${ClssNms.U_INFO_CONTENT_INPUT}`
        ) as HTMLInputElement | null;
        const fieldNameDel = fieldMapping[field];
        if (fieldNameDel) {
          this.UserData[fieldNameDel] = '';
        }

        if (!openEditInput) {
          const btnSave = container.querySelector('.user-info__btn-save');
          btnSave?.setAttribute('disabled', 'true');

          const userInfoCntntSpan = userInfoField.querySelector(`.${ClssNms.U_INFO_CONTENT}`);
          const inputUserInfoCntnt = createInputElement(ClssNms.U_INFO_CONTENT_INPUT, '', [
            { name: 'value', value: currField.value },
            { name: 'placeholder', value: 'Enter password' },
            { name: 'type', value: 'password' },
          ]);
          userInfoCntntWrap.appendChild(errMsgElem);

          inputUserInfoCntnt.addEventListener('input', () => {
            for (let i = 0; i < arrCondFn[index].length; i += 1) {
              const inptValue = inputUserInfoCntnt.value;
              const errMsg = errMsgsWords[index][i];
              if (!arrCondFn[index][i](inptValue)) {
                errMsgElem.textContent = errMsg;
                errMsgElem.style.display = 'block';
                userInfoEditBtn.classList.add(`${ClssNms.U_INFO_EDIT_BTN_DISABLED}`);
                userInfoEditBtn.setAttribute('disabled', 'true');
                break;
              } else {
                errMsgElem.textContent = '';
                errMsgElem.style.display = '';
                userInfoEditBtn.classList.remove(`${ClssNms.U_INFO_EDIT_BTN_DISABLED}`);
                userInfoEditBtn.removeAttribute('disabled');
              }
            }
          });
          userInfoCntntSpan?.remove();
          userInfoCntntWrap.appendChild(inputUserInfoCntnt);
        } else {
          const inputValue = openEditInput.value;
          if (this.UserData.currentPassword && this.UserData.newPassword) {
            const btnSave = container.querySelector('.user-info__btn-save');
            btnSave?.removeAttribute('disabled');
          }

          const fieldName = fieldMapping[field];
          if (fieldName) {
            this.UserData[fieldName] = inputValue;
          }
          if (this.UserData.currentPassword && this.UserData.newPassword) {
            const btnSave = container.querySelector('.user-info__btn-save');
            btnSave?.removeAttribute('disabled');
          }

          currField.value = openEditInput.value;
          openEditInput.remove();
          let userInfoContent: HTMLSpanElement;
          if (inputValue === '') {
            userInfoContent = createSpanElement(ClssNms.U_INFO_CONTENT, '•'.repeat(value.length));
          } else {
            userInfoContent = createSpanElement(ClssNms.U_INFO_CONTENT, '•'.repeat(currField.value.length));
          }
          userInfoCntntWrap.appendChild(userInfoContent);
        }
      });

      const imgEdit = createImage(edit, Txt.ALT_EDIT, ClssNms.IMG_EDIT);
      userInfoEditBtn.appendChild(imgEdit);
      userInfoEdit.appendChild(userInfoEditBtn);

      userInfo.append(userInfoFieldWrap, userInfoEdit);
      container.appendChild(userInfo);
    });

    container.appendChild(saveBtn);
    return container;
  }

  render(allUserData: CustomerData) {
    this.pageWrapper.append(this.header, this.main);
    const { body } = document;
    body.appendChild(this.pageWrapper);

    window.location.hash = 'profile-page';
    this.UserData = getPersonalData(allUserData);
    this.copyInitData();

    const basicFields = [
      {
        field: Txt.FIRST_NAME_DSCR,
        value: this.UserData.firstName,
      },
      {
        field: Txt.LAST_NAME_DSCR,
        value: this.UserData.lastName,
      },
      {
        field: Txt.DATE_OF_BIRTH_DSCR,
        value: this.UserData.dateOfBirth,
      },
    ];

    const contactFields = [
      {
        field: Txt.EMAIL_DSCR,
        value: this.UserData.email,
      },
    ];

    const titlePersonalPage = this.createTitlePage();
    const basicInfContainer = this.createPIContainer(Txt.BASIC_TITLE, basicFields, basicCondFn, basicErr);
    const contactInfContainer = this.createPIContainer(Txt.CONTACT_INF_TITLE, contactFields, contactCondFn, contErr);
    const addressesContainer = this.createPIContainerAddress(this.UserData.addresses, adrsCondFn, adrsErr);
    const securContainer = this.createSecurityContainer(Txt.SECURITY_TITLE, securFields, securCondFn, securErr);

    this.mainWrapper.append(
      titlePersonalPage,
      basicInfContainer,
      contactInfContainer,
      addressesContainer,
      securContainer
    );
    this.main.appendChild(this.mainWrapper);

    const catalogPageHeader = new HeaderComponent();
    const { appName, logoContainer, logo, navBar, navigation, navItem, link } = catalogPageHeader;
    this.addElemsToHeader(appName, logoContainer, navBar);
    logoContainer.append(logo);
    navBar.className = 'nav-bar-catalog-page';
    navBar.append(navigation);
    const isUserLoggedIn = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string);
    const logLink = isUserLoggedIn ? 'Log out' : 'Log in';
    const profileLink = isUserLoggedIn ? 'Profile' : false;
    const basketIcon = createHtmlElement('i', 'fa-solid fa-cart-shopping') as HTMLElement;
    const linkName = [logLink, 'Register', 'Catalog', 'Back to main', 'About Us', `${basketIcon}`];

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
      if (linkName[i] !== '[object HTMLElement]') {
        navLinksArr[i].innerHTML = linkName[i];
        console.log(linkName[i]);
      } else {
        navLinksArr[i].append(basketIcon);
      }
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
  }

  renderPage() {
    new CustomerLoader()
      .getCustomerData()
      .then((data) => this.render(data))
      .catch(console.log);

    return this.pageWrapper;
  }
}

export default PersonalRender;
