import Page from '../../templates/page';
import {
  createButtonElement,
  createDivElement,
  createImage,
  createInputElement,
  createLabelElement,
  createSpanElement,
  createH2Element,
  createH3Element,
} from '../../utils/functions';
import { Address, AddressTypes, Addresses, CurrAdrs, CustomerData } from '../../utils/types';
import { AdrsType, ClssNms, Txt } from './constants/constants';

import edit from '../../../assets/images/edit.svg';
import deleteAddress from '../../../assets/images/delete_address.svg';
import toogle from '../../../assets/images/toggle.svg';

interface FieldUser {
  field: string;
  value: string;
}

type FieldsUser = FieldUser[];

const objData = {
  email: 'ggdg3333@gm.com',
  firstName: 'gh',
  lastName: 'hgf',
  dateOfBirth: '2000-06-05',
  addresses: [
    {
      id: 'lbDtYVBt',
      streetName: 'h',
      streetNumber: '5',
      postalCode: '55555',
      city: 'sh',
      country: 'DE',
    },
    {
      id: 'MBxoLE-T',
      streetName: 'g',
      streetNumber: '2',
      postalCode: '33333',
      city: 'j',
      country: 'DE',
    },
    {
      id: 'hQ5LN0Vv',
      streetName: 'hHj',
      streetNumber: '33',
      postalCode: '75389',
      city: 'Bghgfh',
      country: 'DE',
    },
    {
      id: 'tmiWbgvO',
      streetName: 'g4444',
      streetNumber: '2',
      postalCode: '42477',
      city: 'HHHHHHHHHHHH',
      country: 'DE',
      pOBox: '',
    },
  ],
  defaultBillingAddressId: 'MBxoLE-T',
  shippingAddressIds: ['hQ5LN0Vv', 'lbDtYVBt'],
  billingAddressIds: ['tmiWbgvO', 'hQ5LN0Vv', 'MBxoLE-T'],
  key: '852881',
};

// TODO: добавить аннотацию с помощью Response
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

  return { firstName, lastName, dateOfBirth, email, addresses };
};

class PersonalRender extends Page {
  numberAddrs: number;

  UserData!: { firstName: string; lastName: string; dateOfBirth: string; email: string; addresses: Addresses };

  constructor(id: string) {
    super(id);
    this.pageWrapper.classList.add(ClssNms.WRAPPER_PI);
    this.main.classList.add(ClssNms.MAIN);
    this.mainWrapper.classList.add(ClssNms.WRAPPER_MAIN_PI);
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

  // [{field: 'Email', value: 'example@gmail.com'}, ...]
  private createPIContainer(titleContainer: string, fields: FieldsUser) {
    const container = this.createContainer(titleContainer);

    fields.forEach(({ field, value }) => {
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
      userInfoCntntWrap.appendChild(userInfoCntnt);
      userInfoField.append(userInfoDescrWrap, userInfoCntntWrap);
      userInfoFieldWrap.appendChild(userInfoField);

      const userInfoEdit = createDivElement(ClssNms.U_INFO_EDIT);
      const userInfoEditBtn = createButtonElement(ClssNms.U_INFO_EDIT_BTN);

      // addresses: [
      //   {

      //   }
      // ]
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
          userInfoCntntSpan?.remove();
          userInfoCntntWrap.appendChild(inputUserInfoCntnt);
        } else {
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

    return container;
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

  private addType(
    typeCont: HTMLDivElement | HTMLInputElement,
    openBtnListType: HTMLButtonElement | null,
    typeAdd: string,
    arrCurrTypes: string[]
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
          const typeElemDelete = Array.from(typeCont.querySelectorAll(`.${ClssNms.U_INFO_CONTENT_ADRS_TYPE}`)).filter(
            (currTypeElem) => currTypeElem.textContent === typeDefault
          )[0].parentElement;
          typeElemDelete?.remove();
          const indexTypeDefaultDel = arrCurrTypes.indexOf(typeDefault);
          arrCurrTypes.splice(indexTypeDefaultDel, 1);
        }
        //
      });
      UInfoCntntAdrsTypeWrap.append(UInfoCntntAdrsType, UInfoCntntAdrsTypeDelete);
      if (openBtnListType) {
        typeCont.insertBefore(UInfoCntntAdrsTypeWrap, openBtnListType);
      } else {
        typeCont.appendChild(UInfoCntntAdrsTypeWrap);
      }
    }
  }

  private openAdrs(DataAdrs: Address, index: number) {
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
    Object.entries(currAddrs).forEach(([key, value]) => {
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
      UInfoContentWrap.appendChild(UInfoContent);
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
          const inputAttr = [{ name: 'value', value: currValueObj.currValue || '' }];
          let inputUserInfoCntnt: HTMLDivElement | HTMLInputElement;
          if (key === Txt.ADRS_TYPE_DSCR) {
            inputUserInfoCntnt = createDivElement(ClssNms.U_INFO_CONTENT_INPUT);
            currValueObj.currValue?.split(', ').forEach((adrs) => {
              if (adrs !== ', ' && adrs) {
                currValueTypes.push(adrs);
                this.addType(inputUserInfoCntnt, null, adrs, currValueTypes);
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
                      const addTypeForDefault = type.split(' ')[1];
                      currValueTypes.push(type);
                      this.addType(inputUserInfoCntnt, UInfoCntntInpOpenBtn, type, currValueTypes);

                      if (
                        (type === AdrsType.BILLING_DEFAULT || type === AdrsType.SHIPPING_DEFAULT) &&
                        !currValueTypes.includes(addTypeForDefault)
                      ) {
                        const typeElemDelete = Array.from(
                          UInfoContentWrap.querySelectorAll(`.${ClssNms.U_INFO_OPEN_TYPE_ELEM}`)
                        ).filter((currTypeElem) => currTypeElem.textContent === addTypeForDefault)[0];
                        typeElemDelete?.remove();
                        this.addType(inputUserInfoCntnt, UInfoCntntInpOpenBtn, addTypeForDefault, currValueTypes);
                        currValueTypes.push(addTypeForDefault);
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
            inputUserInfoCntnt = createInputElement(ClssNms.U_INFO_CONTENT_INPUT, '', inputAttr);
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

          currValueObj.currValue = currAdrsType;
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

  private createPIContainerAddress(DataAddresses: Addresses) {
    const container = this.createContainer(Txt.ADRSS_TITLE);

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

      const UInfoToggle = createDivElement(ClssNms.U_INFO_TOGGLE);
      const UInfoToggleBtn = createButtonElement(ClssNms.U_INFO_TOGGLE_BTN);
      let currOpenAdress = this.openAdrs(DataAdrs, index);

      UInfoToggleBtn.addEventListener('click', (event) => {
        console.log('DataAdrs:', DataAdrs);
        event.preventDefault();
        const openAdrsElem = userAddress.querySelector(`.${ClssNms.U_INFO_ADRS_OPEN}`) as HTMLElement;
        if (!openAdrsElem) {
          const deleteAdrsContainer = userAddress.querySelector(`.${ClssNms.U_INFO_ADRS_CONTAINER}`);
          deleteAdrsContainer?.remove();
          userAddress.appendChild(currOpenAdress);
          setTimeout(() => currOpenAdress.classList.add(ClssNms.ADRS_OPEN), 10);
        } else {
          openAdrsElem.style.overflow = 'hidden';
          currOpenAdress = this.openAdrs(DataAdrs, index);
          const currUInfoAdrsContainer = this.createAdrsContainer(this.UserData.addresses[index]);
          openAdrsElem.classList.remove(ClssNms.ADRS_OPEN);
          setTimeout(() => {
            if (!openAdrsElem.classList.contains(ClssNms.ADRS_OPEN)) {
              openAdrsElem.remove();
              UInfoAdrsInfo.appendChild(currUInfoAdrsContainer);
              openAdrsElem.style.overflow = '';
            }
          }, 1000);
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

    return container;
  }

  render() {
    this.UserData = getPersonalData(objData);

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
    const basicInfContainer = this.createPIContainer(Txt.BASIC_TITLE, basicFields);
    const contactInfContainer = this.createPIContainer(Txt.CONTACT_INF_TITLE, contactFields);

    const addressesContainer = this.createPIContainerAddress(this.UserData.addresses);

    this.mainWrapper.append(titlePersonalPage, basicInfContainer, contactInfContainer, addressesContainer);
    this.main.appendChild(this.mainWrapper);
    this.pageWrapper.appendChild(this.main);
    const { body } = document;
    body.appendChild(this.pageWrapper);
    // return this.pageWrapper;
  }
}

export default PersonalRender;
