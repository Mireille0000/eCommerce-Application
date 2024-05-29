// import Page from "../templates/page";
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
import { AddressTypes, Addresses, CurrAdrs, CustomerData } from '../../utils/types';
import { ClssNms, Txt } from './constants/constants';

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
      const userInfo = createDivElement(ClssNms.U_INFO);
      const userInfoFieldWrap = createDivElement(ClssNms.U_INFO_FIELD_WRAP);
      const userInfoField = createDivElement(ClssNms.U_INFO_FIELD);

      const userInfoDescrWrap = createDivElement(ClssNms.U_INFO_DESCR_WRAP);
      const userInfoDescr = createLabelElement(ClssNms.U_INFO_DESCR, field);
      userInfoDescrWrap.appendChild(userInfoDescr);

      const userInfoCntntWrap = createDivElement(ClssNms.U_INFO_CONTENT_WRAP);
      const userInfoCntnt = createSpanElement(ClssNms.U_INFO_CONTENT, value);
      userInfoCntntWrap.appendChild(userInfoCntnt);
      userInfoField.append(userInfoDescrWrap, userInfoCntntWrap);
      userInfoFieldWrap.appendChild(userInfoField);

      const userInfoEdit = createDivElement(ClssNms.U_INFO_EDIT);
      const userInfoEditBtn = createButtonElement(ClssNms.U_INFO_EDIT_BTN);
      userInfoEditBtn.addEventListener('click', (event: Event) => {
        event.preventDefault();
        if (userInfoCntnt) {
          const inputUserInfoCntnt = createInputElement(ClssNms.U_INFO_CONTENT_INPUT, value);
          userInfoCntnt.remove();
          userInfoCntntWrap.appendChild(inputUserInfoCntnt);
        } else {
          const userInfoContent = createSpanElement(ClssNms.U_INFO_CONTENT, value);
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

  // [
  //   {
  //     address: 'Germany, Berlin, Simonskija 32, 32244',
  //     addressTypes: 'Default Billing, Default Shipping, Billing, Shipping'
  //   },
  //   ...
  // ]

  // private openAdrs

  private openAdrs(adrs: CurrAdrs) {
    const UInfoAdrsOpen = createDivElement(ClssNms.U_INFO_ADRS_OPEN);
    Object.entries(adrs).forEach((item) => {
      const [key, value] = item;
      const UInfo = createDivElement(ClssNms.U_INFO);
      const UInfoFieldWrap = createDivElement(ClssNms.U_INFO_FIELD_WRAP);
      const UInfoDescrWrap = createDivElement(ClssNms.U_INFO_DESCR_WRAP);
      const UInfoDescr = createDivElement(ClssNms.U_INFO_DESCR, key);
      UInfoDescrWrap.appendChild(UInfoDescr);

      const UInfoContentWrap = createDivElement(ClssNms.U_INFO_CONTENT_WRAP);
      const UInfoContent = createSpanElement(ClssNms.U_INFO_CONTENT, value);
      UInfoContentWrap.appendChild(UInfoContent);
      UInfoFieldWrap.append(UInfoDescrWrap, UInfoContentWrap);

      const UInfoEdit = createDivElement(ClssNms.U_INFO_EDIT);
      const UInfoEditBtn = createButtonElement(ClssNms.U_INFO_EDIT_BTN);
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

    DataAddresses.forEach(({ city, streetName, streetNumber, postalCode, addressType }) => {
      const currAddrs: CurrAdrs = {
        [Txt.COUNTRY_DSCR]: Txt.ADRS_COUNTRY,
        [Txt.SITY_DSCR]: city,
        [Txt.STREET_DSCR]: streetName,
        [Txt.STREET_NUMB_DSCR]: streetNumber,
        [Txt.POSTAL_CODE_DSCR]: postalCode,
        [Txt.ADRS_TYPE_DSCR]: addressType?.join(', '),
      };
      const userAddress = createDivElement(ClssNms.U_ADRS);
      const userInfo = createDivElement(ClssNms.U_INFO);
      const UInfoAdrsInfo = createDivElement(ClssNms.U_INFO_ADRS_INFO);
      const UInfoAdrsNumberWrap = createDivElement(ClssNms.U_INFO_ADRS_NUMBER_WRAP);
      const UInfoAdrsNumber = createLabelElement(
        ClssNms.U_INFO_ADRS_NUMBER,
        `${Txt.ADRS_DSCR} #${(this.numberAddrs += 1)}`
      );
      UInfoAdrsNumberWrap.appendChild(UInfoAdrsNumber);

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
      UInfoAdrsInfo.append(UInfoAdrsNumberWrap, UInfoAdrsContainer);

      const UInfoBtns = createDivElement(ClssNms.U_INFO_BTNS);
      const UInfoDelAdrs = createDivElement(ClssNms.U_INFO_DELETE_ADDRESS);
      const UInfoDelAdrsBtn = createDivElement(ClssNms.U_INFO_DELETE_ADDRESS_BTN);
      const imgDelAdrs = createImage(deleteAddress, Txt.ALT_DELETE_ADRS, ClssNms.IMG_DELETE_ADRS);
      UInfoDelAdrsBtn.appendChild(imgDelAdrs);
      UInfoDelAdrs.appendChild(UInfoDelAdrsBtn);

      const UInfoToggle = createDivElement(ClssNms.U_INFO_TOGGLE);
      const UInfoToggleBtn = createButtonElement(ClssNms.U_INFO_TOGGLE_BTN);
      UInfoToggleBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const openAdrsElem = userAddress.querySelector(`.${ClssNms.U_INFO_ADRS_OPEN}`);
        if (!openAdrsElem) {
          const currOpenAdress = this.openAdrs(currAddrs);
          UInfoAdrsContainer.remove();
          userAddress.appendChild(currOpenAdress);
          setTimeout(() => currOpenAdress.classList.add(ClssNms.ADRS_OPEN), 10);
        } else {
          openAdrsElem.classList.remove(ClssNms.ADRS_OPEN);
          setTimeout(() => {
            if (!openAdrsElem.classList.contains(ClssNms.ADRS_OPEN)) {
              openAdrsElem.remove();
              UInfoAdrsInfo.appendChild(UInfoAdrsContainer);
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

    // const test123 = contactInfContainer.querySelector('.user-info__content');
    // if (test123) test123.textContent = 'kuy';
    // contactInfContainer.querySelector('.user-info__content')?.textContent = 'kuy';

    const addressesContainer = this.createPIContainerAddress(this.UserData.addresses);

    this.mainWrapper.append(titlePersonalPage, basicInfContainer, contactInfContainer, addressesContainer);
    this.main.appendChild(this.mainWrapper);
    this.pageWrapper.appendChild(this.main);
    const { body } = document;
    body.appendChild(this.pageWrapper);
    // return this.pageWrapper;
  }
}

// new PersonalRender('personal-page').render();
export default PersonalRender;
