import { /* ProductsListData */ Prices, ProductsListDataNew } from './interfaces-catalog-page';
import { addEventHandler } from '../../utils/functions';
import productContainerElem from '../../pages/catalog-product-page/product-list-manipulations/functions-catalog-page';
import {
  ProcessEnvCartManipulationgs,
  getAnonymousSessionToken,
  getCartById,
  getMyCartInfo,
} from '../cart-catalog-requests/cart-catalog-requests';
import getProductsPartly from './pagination-requests/pagination-requests';

export const enum ProcessEnvCatalog {
  PROJECT_KEY = 'ecommerce-app-f-devs',

  CLIENT_ID = 'fGkJ1K9vPXR6Vee9E-SIkaJC',

  SECRET = 'o-i1eGtuwKbH0T8FgH4Gq-Elbbr6sBEf',

  DISCOUNT_KEY = 'staff-discount-key',
}

function getDataKey(productContainer: string) {
  const cards = Array.from(document.querySelectorAll(`${productContainer}`)) as Array<HTMLElement>;
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      window.location.hash = `${`detailed-product-page/${card.dataset.key}`}`;
    });
  });
}

export function createProductCards(token: string, dataProducts: ProductsListDataNew) {
  const numOfProducts = dataProducts.count;

  const wrapperProductCarts = document.querySelector('.wrapper-main') as HTMLDivElement;
  const productsWrapper = document.querySelector('.product-wrapper') as HTMLElement;
  productsWrapper.innerHTML = '';
  productContainerElem(productsWrapper);
  wrapperProductCarts.append(productsWrapper);
  const productContainer = document.querySelector('.product-container') as HTMLDivElement;

  for (let i = 0; i < numOfProducts - 1; i += 1) {
    productsWrapper.appendChild(productContainer.cloneNode(true));
  }
  getDataKey('.product-card-info'); //

  const addToCartButtons = Array.from(document.querySelectorAll('.add-to-cart-button'));
  const modalprogressIndicator = document.querySelector('.wrapper-progress-indicator') as HTMLDivElement;
  addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!sessionStorage.getItem('cartDataAnon') && !localStorage.getItem('data')) {
        btn.classList.add('disabled');
        btn.setAttribute('disabled', '');
        modalprogressIndicator.classList.add('active');
        getAnonymousSessionToken(btn.id);
        console.log(token);
      } else if (localStorage.getItem('data') && !sessionStorage.getItem('cartDataAnon')) {
        btn.classList.add('disabled');
        btn.setAttribute('disabled', '');
        modalprogressIndicator.classList.add('active');
        // createMyCart(JSON.parse(localStorage.getItem('data') as string).access_token, btn.id);
        getMyCartInfo(JSON.parse(localStorage.getItem('data') as string).access_token, btn.id);
        console.log('work');
      } else if (sessionStorage.getItem('cartDataAnon') && !localStorage.getItem('data')) {
        btn.classList.add('disabled');
        btn.setAttribute('disabled', '');
        modalprogressIndicator.classList.add('active');
        const cartId = JSON.parse(sessionStorage.getItem('cartDataAnon') as string);
        getCartById(cartId.id, token, btn.id);
        console.log(token);
      } else {
        console.log('error');
      }
    });
  });

  for (let i = 0; i < numOfProducts; i += 1) {
    const { masterVariant, name, description } = dataProducts.results[i];
    const productCards = Array.from(document.querySelectorAll('.product-card-info'));
    const productImagesArr = Array.from(document.querySelectorAll('.product-image img')) as Array<HTMLImageElement>;
    const productNamesArr = Array.from(document.querySelectorAll('.product-name'));
    const productDescriptionsArr = Array.from(document.querySelectorAll('.product-description'));
    const productPrices = Array.from(document.querySelectorAll('.price'));

    productCards[i].setAttribute('data-key', `${dataProducts.results[i].key}`); //
    addToCartButtons[i].setAttribute('id', `${dataProducts.results[i].key}`);
    productImagesArr[i].src = `${masterVariant.images[0].url}`;
    productImagesArr[i].alt = `${name['en-US']}`;
    productNamesArr[i].innerHTML = `${name['en-US']}`;
    productDescriptionsArr[i].innerHTML = `${description['en-US']}`;
    if (masterVariant.prices.length > 0) {
      productPrices[i].innerHTML = `Price: ${masterVariant.prices[0].value.centAmount / 100}€`;
    } else {
      productPrices[i].innerHTML = 'No price';
    }
  }
}

interface ProductsArrF {
  description: { 'en-US': string };
  masterVariant: {
    assets: [];
    attributes: [];
    id: number;
    images: [
      {
        dimensions: object;
        url: string;
      },
    ];
    key: string;
    prices: [
      {
        id: string;
        key: string;
        value: {
          centAmount: number;
          currencyCode: string;
          fractationDigits: number;
          type: string;
        };
      },
    ];
    sku: string;
  };
  name: { 'en-US': string };
  key: string;
}

interface filteredData {
  count: number;
  limit: 20;
  offset: number;
  results: Array<ProductsArrF>;
  total: number;
}

function createFilteredProductCards(token: string, dataProducts: filteredData) {
  const numOfProducts = dataProducts.total;

  const wrapperProductCarts = document.querySelector('.wrapper-main') as HTMLDivElement;
  const productsWrapper = document.querySelector('.product-wrapper') as HTMLElement;
  productsWrapper.innerHTML = '';
  productContainerElem(productsWrapper);
  wrapperProductCarts.append(productsWrapper);
  const productContainer = document.querySelector('.product-container') as HTMLDivElement;

  if (numOfProducts < 1) {
    productsWrapper.innerHTML = 'NOTHING WAS FOUND';
  }
  for (let i = 0; i < numOfProducts - 1; i += 1) {
    productsWrapper.appendChild(productContainer.cloneNode(true));
  }
  getDataKey('.product-card-info');
  const modalprogressIndicator = document.querySelector('.wrapper-progress-indicator') as HTMLDivElement;
  const addToCartButtons = Array.from(document.querySelectorAll('.add-to-cart-button')); //
  addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!sessionStorage.getItem('cartDataAnon') && !localStorage.getItem('data')) {
        btn.classList.add('disabled');
        btn.setAttribute('disabled', '');
        modalprogressIndicator.classList.add('active');
        getAnonymousSessionToken(btn.id);
        console.log(token);
      } else if (localStorage.getItem('data') && !sessionStorage.getItem('cartDataAnon')) {
        btn.classList.add('disabled');
        btn.setAttribute('disabled', '');
        modalprogressIndicator.classList.add('active');
        getMyCartInfo(JSON.parse(localStorage.getItem('data') as string).access_token, btn.id);
        console.log('work');
      } else if (sessionStorage.getItem('cartDataAnon') && !localStorage.getItem('data')) {
        btn.classList.add('disabled');
        btn.setAttribute('disabled', '');
        modalprogressIndicator.classList.add('active');
        const cartId = JSON.parse(sessionStorage.getItem('cartDataAnon') as string);
        getCartById(cartId.id, token, btn.id);
        console.log(token);
      } else {
        console.log('error');
      }
    });
  });

  for (let i = 0; i < numOfProducts; i += 1) {
    const { name, description } = dataProducts.results[i];
    const productImagesArr = Array.from(document.querySelectorAll('.product-image img')) as Array<HTMLImageElement>;
    const productNamesArr = Array.from(document.querySelectorAll('.product-name'));
    const productDescriptionsArr = Array.from(document.querySelectorAll('.product-description'));
    const productPrices = Array.from(document.querySelectorAll('.price'));
    // const productCards = Array.from(document.querySelectorAll('.product-container'));
    const productCards = Array.from(document.querySelectorAll('.product-card-info'));

    productCards[i].setAttribute('data-key', `${dataProducts.results[i].key}`); //
    addToCartButtons[i].setAttribute('id', `${dataProducts.results[i].key}`);
    productImagesArr[i].src = `${dataProducts.results[i].masterVariant.images[0].url}`;
    productImagesArr[i].alt = `${name['en-US']}`;
    productNamesArr[i].innerHTML = `${name['en-US']}`;
    productDescriptionsArr[i].innerHTML = `${description['en-US']}`;
    if (dataProducts.results[i].masterVariant.prices.length > 0) {
      productPrices[i].innerHTML =
        `Price: ${(dataProducts.results[i].masterVariant.prices[0] as Prices).value.centAmount / 100}€`;
    } else {
      productPrices[i].innerHTML = 'No price';
    }
  }
}

export function overlinePrice(prices: Array<HTMLElement>, discounts: Array<HTMLElement>) {
  return discounts.forEach((discount, i) => {
    if (discount.innerHTML) {
      prices[i].setAttribute('style', 'text-decoration: line-through');
    }
  });
}

function addRemoveActiveState(elemByClass: string) {
  const activeToRemove = document.querySelector('.active-category') as HTMLElement;
  if (activeToRemove) {
    activeToRemove.classList.remove('active-category');
  }
  const elem = document.querySelector(`.${elemByClass}`) as HTMLElement;
  elem.classList.add('active-category');
}

export async function getDiscountsInfo(token: string, data: ProductsListDataNew, SKU: Array<string>) {
  console.log('fetching discounts');
  try {
    const responseDiscounts = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/product-discounts/key=${ProcessEnvCatalog.DISCOUNT_KEY}/`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const discountsData = await responseDiscounts.json();
    if (discountsData.status === 400) {
      const error = new Error(`${discountsData.message}`);
      throw error;
    } else {
      const discountAmount = discountsData.predicate;
      const productPrices = Array.from(document.querySelectorAll('.price')) as Array<HTMLElement>;
      const productDiscounts = Array.from(document.querySelectorAll('.discount')) as Array<HTMLElement>;
      const productDiscountPrices = Array.from(document.querySelectorAll('.discount-price'));
      // get skus of the discounted products
      const SKUData: Array<string> = discountAmount.split('"');
      const skuArr = SKUData.reduce((acc: Array<string>, sku, _, arr) => {
        if (arr.indexOf(sku) % 2 !== 0) {
          acc.push(sku);
        }
        return acc;
      }, []);
      console.log(skuArr);
      //  display discounts and prices with discounts
      const discount = discountsData.value.permyriad / 100;
      for (let i = 0; i < SKU.length; i += 1) {
        console.log('sku', SKU);
        console.log('data', data);
        const originalPrice = data.results[i].masterVariant.prices[0].value.centAmount / 100;
        if (skuArr.includes(SKU[i])) {
          // console.log('sku', skuArr);
          console.log('changing price');
          productDiscounts[i].innerHTML = `Discount ${discount}%`;
          productDiscountPrices[i].innerHTML = `New Price: ${originalPrice * (1 - discount / 100)}€`;
        }
      }

      overlinePrice(productPrices, productDiscounts);
      console.log('done fetching discounts');
      return skuArr;
    }
  } catch (err) {
    return err;
  }
}

export async function getDiscountsInfoFilteredList(token: string, data: filteredData, SKU: Array<string>) {
  try {
    const responseDiscounts = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/product-discounts/key=${ProcessEnvCatalog.DISCOUNT_KEY}/`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const discountsData = await responseDiscounts.json();
    if (discountsData.status === 400) {
      const error = new Error(`${discountsData.message}`);
      throw error;
    } else {
      const discountAmount = discountsData.predicate;
      const productPrices = Array.from(document.querySelectorAll('.price')) as Array<HTMLElement>;
      const productDiscounts = Array.from(document.querySelectorAll('.discount')) as Array<HTMLElement>;
      const productDiscountPrices = Array.from(document.querySelectorAll('.discount-price'));
      // get skus of the discounted products
      const SKUData: Array<string> = discountAmount.split('"');
      const skuArr = SKUData.reduce((acc: Array<string>, sku, _, arr) => {
        if (arr.indexOf(sku) % 2 !== 0) {
          acc.push(sku);
        }
        return acc;
      }, []);
      //  display discounts and prices with discounts
      const discount = discountsData.value.permyriad / 100;
      for (let i = 0; i < SKU.length; i += 1) {
        const originalPrice = data.results[i].masterVariant.prices[0].value.centAmount / 100;
        console.log(originalPrice);
        if (skuArr.includes(SKU[i])) {
          productDiscounts[i].innerHTML = `Discount ${discount}%`;
          productDiscountPrices[i].innerHTML = `New Price: ${originalPrice * (1 - discount / 100)}€`;
        }
      }

      overlinePrice(productPrices, productDiscounts);
      return skuArr;
    }
  } catch (err) {
    return err;
  }
}

// pagination function
function pagination(token: string) {
  const previousBtn = document.querySelector('.prev-button') as HTMLButtonElement;
  const nextBtn = document.querySelector('.next-button') as HTMLButtonElement;
  let prevTest = 16;
  let nextTest = 0;
  getProductsPartly(token, nextTest);
  previousBtn.addEventListener('click', () => {
    if (prevTest === 16 && nextTest === 0) {
      getProductsPartly(token, nextTest);
      //   console.log(`${nextTest}`);
    } else if (prevTest < 16 || prevTest >= 0) {
      prevTest += 4;
      nextTest -= 4;
      getProductsPartly(token, nextTest);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (nextTest === 16 && prevTest === 0) {
      getProductsPartly(token, nextTest);
    } else if (nextTest < 16 || nextTest >= 0) {
      nextTest += 4;
      prevTest -= 4;
      getProductsPartly(token, nextTest);
    }
  });
}

export async function getProductList(token: string) {
  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/products`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${`${token}`}`,
        },
      }
    );
    const data = await response.json();
    if (data.status === 400) {
      const error = new Error(`${data.message}`);
      throw error;
    } else {
      createProductCards(token, data);
      const SKUArr: Array<string> = [];
      for (let i = 0; i < data.count; i += 1) {
        SKUArr.push(data.results[i].masterVariant.sku);
      }
      getDiscountsInfo(token, data, SKUArr);
      console.log(SKUArr);
      return data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

// filtering request

async function getFilteredList(token: string, attributes: string) {
  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/product-projections/search?${attributes}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${`${token}`}`,
        },
      }
    );
    const filteredData = await response.json();
    if (filteredData.status === 400 || filteredData.status === 401) {
      const error = new Error(filteredData.message);
      throw error;
    } else {
      createFilteredProductCards(token, filteredData);
      const SKUArr: Array<string> = [];
      for (let i = 0; i < filteredData.total; i += 1) {
        SKUArr.push(filteredData.results[i].masterVariant.sku);
      }
      getDiscountsInfoFilteredList(token, filteredData, SKUArr);
    }
    return filteredData;
  } catch (err) {
    return err;
  }
}

// sorting request
async function getSortedElements(token: string, requestOption: string) {
  try {
    const responseSorted = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/product-projections/${requestOption}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${`${token}`}`,
        },
      }
    );
    const dataSorted = await responseSorted.json();
    if (dataSorted.status === 400 || dataSorted.status === 401) {
      const error = new Error(dataSorted.message);
      throw error;
    } else {
      createFilteredProductCards(token, dataSorted);
      const SKUArr: Array<string> = [];
      for (let i = 0; i < dataSorted.total; i += 1) {
        SKUArr.push(dataSorted.results[i].masterVariant.sku);
      }
      getDiscountsInfoFilteredList(token, dataSorted, SKUArr);
    }
    return dataSorted;
  } catch (err) {
    return err;
  }
}

// searching request
async function getSearchedData(token: string, inputValue: string) {
  try {
    const responseSearched = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/product-projections/search?staged=true&fuzzy=true&text.en-US=${inputValue}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${`${token}`}`,
        },
      }
    );
    const dataSearched = await responseSearched.json();
    if (dataSearched.status === 400 || dataSearched.status === 401) {
      const error = new Error(dataSearched.message);
      throw error;
    } else {
      createFilteredProductCards(token, dataSearched);
      const SKUArr: Array<string> = [];
      for (let i = 0; i < dataSearched.total; i += 1) {
        SKUArr.push(dataSearched.results[i].masterVariant.sku);
      }
      getDiscountsInfoFilteredList(token, dataSearched, SKUArr);
      // console.log(dataSearched);
    }
    return dataSearched;
  } catch (err) {
    return err;
  }
}

// navigation category

async function getSubcategoryData(token: string, subcategoryId: string) {
  try {
    const responseSubcategoryData = await fetch(
      `
      https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/product-projections/search?filter=categories.id:${subcategoryId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${`${token}`}`,
        },
      }
    );
    const subcategoryData = await responseSubcategoryData.json();
    if (subcategoryData.status === 400 || subcategoryData.status === 401) {
      const error = new Error(subcategoryData.message);
      throw error;
    } else {
      createFilteredProductCards(token, subcategoryData);
      // console.log(subcategoryData);
    }
    return subcategoryData;
  } catch (err) {
    return err;
  }
}

async function getCategoryDataById(token: string, categoryId: string) {
  try {
    const responseCategoryData = await fetch(
      `
      https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/product-projections/search?filter=categories.id:${categoryId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${`${token}`}`,
        },
      }
    );
    const categoryData = await responseCategoryData.json();
    if (categoryData.status === 400 || categoryData.status === 401) {
      const error = new Error(categoryData.message);
      throw error;
    } else {
      createFilteredProductCards(token, categoryData);
      const SKUArr: Array<string> = [];
      for (let i = 0; i < categoryData.total; i += 1) {
        SKUArr.push(categoryData.results[i].masterVariant.sku);
      }
      getDiscountsInfoFilteredList(token, categoryData, SKUArr);
      // console.log(categoryData);
    }
    return categoryData;
  } catch (err) {
    return err;
  }
}

async function getCategories(token: string) {
  try {
    const responseCategoriesData = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/categories/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${`${token}`}`,
        },
      }
    );
    const categoriesData = await responseCategoriesData.json();
    if (categoriesData.status === 400 || categoriesData.status === 401) {
      const error = new Error(categoriesData.message);
      throw error;
    } else {
      const categoriesId: Array<string> = [];
      for (let i = 0; i < categoriesData.total; i += 1) {
        categoriesId.push(categoriesData.results[i].id);
      }
      const [
        staffCategoryId,
        cauldronCategoryId,
        mageRobeCategoryId,
        enchantedRobesSubcId,
        foggyCauldronSubcId,
        elementalDamageSubcId,
      ] = categoriesId;
      const elemDamageSubcategory = document.querySelector('.elemental-damage-category') as HTMLElement;
      const enchantedRobeSubcategory = document.querySelector('.enchanted-robes-category') as HTMLElement;
      const foggyCauldronSubcategory = document.querySelector('.foggy-cauldron-category') as HTMLElement;
      // console.log(elemDamageSubcategory, enchantedRobeSubcategory, foggyCauldronSubcategory);

      addEventHandler('all-categories', 'click', () => {
        elemDamageSubcategory.innerHTML = '';
        enchantedRobeSubcategory.innerHTML = '';
        foggyCauldronSubcategory.innerHTML = '';
        addRemoveActiveState('all-categories');
        pagination(token);
        // getProductList(token);
      });

      // Staff category
      addEventHandler('staff-category', 'click', () => {
        elemDamageSubcategory.innerHTML = 'Elemental damage';
        enchantedRobeSubcategory.innerHTML = '';
        foggyCauldronSubcategory.innerHTML = '';
        addRemoveActiveState('staff-category');
        getCategoryDataById(token, `"${staffCategoryId}"`);
      });

      addEventHandler('elemental-damage-category', 'click', () => {
        // console.log('Elemental damage');
        addRemoveActiveState('elemental-damage-category');
        getSubcategoryData(token, `"${elementalDamageSubcId}"`);
      });

      // Mage robe category
      addEventHandler('mage-robe-category', 'click', () => {
        // console.log('mage-robe');
        elemDamageSubcategory.innerHTML = '';
        enchantedRobeSubcategory.innerHTML = 'Enchanted mage robe';
        foggyCauldronSubcategory.innerHTML = '';
        addRemoveActiveState('mage-robe-category');
        getCategoryDataById(token, `"${mageRobeCategoryId}"`);
      });

      addEventHandler('enchanted-robes-category', 'click', () => {
        // console.log('Enchanted robes');
        addRemoveActiveState('enchanted-robes-category');
        getSubcategoryData(token, `"${enchantedRobesSubcId}"`);
      });

      // Cauldron category
      addEventHandler('cauldron-category', 'click', () => {
        elemDamageSubcategory.innerHTML = '';
        enchantedRobeSubcategory.innerHTML = '';
        foggyCauldronSubcategory.innerHTML = 'Foggy cauldron';
        addRemoveActiveState('cauldron-category');
        getCategoryDataById(token, `"${cauldronCategoryId}"`);
      });

      addEventHandler('foggy-cauldron-category', 'click', () => {
        // console.log('Foggy cauldron');
        addRemoveActiveState('foggy-cauldron-category');
        getSubcategoryData(token, `"${foggyCauldronSubcId}"`);
      });
    }
    return categoriesData;
  } catch (err) {
    return err;
  }
}

export default async function getProductListByToken() {
  try {
    const response = await fetch(
      `https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Basic ${btoa(`${ProcessEnvCatalog.CLIENT_ID}:${ProcessEnvCatalog.SECRET}`)}`,
        },
      }
    );
    const data = await response.json();
    if (data.status === 400 || data.status === 401) {
      const error = new Error(data.message);
      throw error;
    } else {
      pagination(data.access_token);
      // getProductList(data.access_token);
      console.log(data);
      // filtered data
      addEventHandler('apply-button', 'click', () => {
        const dataObjects = [];
        const inputsArr = Array.from(document.querySelectorAll('.input-option')) as HTMLInputElement[];
        for (let i = 0; i < inputsArr.length; i += 1) {
          if (inputsArr[i].checked) {
            const obj = { ...inputsArr[i].dataset };
            dataObjects.push(obj);
          }
        }

        const dataCheckboxes = dataObjects.reduce(
          (acc, item) => {
            const itemEntries = Object.entries(item);
            if (acc[itemEntries[0][0]]) {
              acc[itemEntries[0][0]].push(`"${itemEntries[0][1]}"`);
            } else {
              acc[itemEntries[0][0]] = [`"${itemEntries[0][1] as string}"`];
            }
            return acc;
          },
          {} as { [key: string]: string[] }
        );
        const dataCheckboxesEntries = Object.entries(dataCheckboxes).reduce((acc: Array<string>, item) => {
          acc.push(`filter=variants.attributes.${item[0]}-attribute:${item[1].join(',')}`);
          return acc;
        }, []);
        getFilteredList(data.access_token, dataCheckboxesEntries.join('&'));
      });
      // sorted data
      addEventHandler('sort-name', 'click', () => {
        // console.log('works');
        const clickedButtonName = document.querySelector('.sort-name') as HTMLElement;
        const clickedButtonPriceL = document.querySelector('.sort-price-lowest') as HTMLElement;
        const clickedButtonPriceH = document.querySelector('.sort-price-highest') as HTMLElement;
        clickedButtonName.classList.toggle('active');
        clickedButtonPriceL.classList.remove('active');
        clickedButtonPriceH.classList.remove('active');
        getSortedElements(data.access_token, '?sort=name.en-US+asc');
      });
      addEventHandler('sort-price-lowest', 'click', () => {
        const clickedButtonName = document.querySelector('.sort-name') as HTMLElement;
        const clickedButtonPriceL = document.querySelector('.sort-price-lowest') as HTMLElement;
        const clickedButtonPriceH = document.querySelector('.sort-price-highest') as HTMLElement;
        clickedButtonName.classList.remove('active');
        clickedButtonPriceL.classList.toggle('active');
        clickedButtonPriceH.classList.remove('active');
        getSortedElements(data.access_token, 'search?sort=price+asc');
      });
      addEventHandler('sort-price-highest', 'click', () => {
        const clickedButtonName = document.querySelector('.sort-name') as HTMLElement;
        const clickedButtonPriceL = document.querySelector('.sort-price-lowest') as HTMLElement;
        const clickedButtonPriceH = document.querySelector('.sort-price-highest') as HTMLElement;
        clickedButtonName.classList.remove('active');
        clickedButtonPriceH.classList.toggle('active');
        clickedButtonPriceL.classList.remove('active');
        getSortedElements(data.access_token, 'search?sort=price+desc');
      });
      // searched data
      const searchInputValue = document.querySelector('.search-input') as HTMLInputElement;
      addEventHandler('search-button', 'click', () => {
        getSearchedData(data.access_token, searchInputValue.value);
      });

      getCategories(data.access_token);
    }
  } catch (err) {
    console.log(err);
  }
}

async function createAnonymousUserCartFromProduct(tokenAnonymousSessions: string) {
  try {
    const responseAnonymousUserCart = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/carts`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${tokenAnonymousSessions}`,
        },
        body: '{"currency" : "EUR"}',
      }
    );
    const dataAnonymousUserCart = await responseAnonymousUserCart.json();

    if (dataAnonymousUserCart.message === 401 || dataAnonymousUserCart.message === 400) {
      const error = new Error(`${dataAnonymousUserCart.message}`);
      throw error;
    } else {
      const cartData = {
        version: dataAnonymousUserCart.version,
        id: dataAnonymousUserCart.id,
      };
      if (!localStorage.getItem('data')) {
        sessionStorage.setItem('cartDataAnon', JSON.stringify(cartData));
      } else {
        window.sessionStorage.clear();
      }
      return dataAnonymousUserCart;
    }
  } catch (err) {
    return err;
  }
}

export async function getAnonymousSessionTokenFromProduct() {
  try {
    const responseToken = await fetch(
      `https://auth.europe-west1.gcp.commercetools.com/oauth/${ProcessEnvCartManipulationgs.PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Basic ${btoa(`${ProcessEnvCartManipulationgs.CLIENT_ID}:${ProcessEnvCartManipulationgs.SECRET}`)}`,
        },
      }
    );
    const dataToken = await responseToken.json();
    if (dataToken.message === 401 || dataToken.message === 400) {
      const error = new Error(`${dataToken.message}`);
      throw error;
    } else {
      const cartTest = await createAnonymousUserCartFromProduct(dataToken.access_token);
      const anonymousTokensObj = {
        access_token: dataToken.access_token,
        refresh_token: dataToken.refresh_token,
      };

      if (!sessionStorage.getItem('anonymousTokensData')) {
        sessionStorage.setItem('anonymousTokensData', JSON.stringify(anonymousTokensObj));
      } else {
        console.log(sessionStorage.getItem('anonymousTokensData'));
      }

      return cartTest;
    }
  } catch (err) {
    return err;
  }
}
