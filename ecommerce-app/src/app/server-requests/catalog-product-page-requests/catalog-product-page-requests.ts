import { ProductsListData, Prices } from './interfaces-catalog-page';
import { addEventHandler } from '../../utils/functions';
import productContainerElem from '../../pages/catalog-product-page/product-list-manipulations/functions-catalog-page';

const enum ProcessEnvCatalog {
  PROJECT_KEY = 'ecommerce-app-f-devs',

  CLIENT_ID = 'fGkJ1K9vPXR6Vee9E-SIkaJC',

  SECRET = 'o-i1eGtuwKbH0T8FgH4Gq-Elbbr6sBEf',

  DISCOUNT_KEY = 'staff-discount-key',
}

function createProductCards(dataProducts: ProductsListData) {
  const numOfProducts = dataProducts.total;

  const wrapperProductCarts = document.querySelector('.wrapper-main') as HTMLDivElement;
  const productsWrapper = document.querySelector('.product-wrapper') as HTMLElement;
  wrapperProductCarts.append(productsWrapper);
  const productContainer = document.querySelector('.product-container') as HTMLDivElement;

  for (let i = 0; i < numOfProducts - 1; i += 1) {
    productsWrapper.appendChild(productContainer.cloneNode(true));
  }

  for (let i = 0; i < numOfProducts; i += 1) {
    const { masterVariant, name, description } = dataProducts.results[i].masterData.staged;
    const productImagesArr = Array.from(document.querySelectorAll('.product-image img')) as Array<HTMLImageElement>;
    const productNamesArr = Array.from(document.querySelectorAll('.product-name'));
    const productDescriptionsArr = Array.from(document.querySelectorAll('.product-description'));
    const productPrices = Array.from(document.querySelectorAll('.price'));
    productImagesArr[i].src = `${masterVariant.images[0].url}`;
    productImagesArr[i].alt = `${name['en-US']}`;
    productNamesArr[i].innerHTML = `${name['en-US']}`;
    productDescriptionsArr[i].innerHTML = `${description['en-US']}`;
    if (masterVariant.prices.length > 0) {
      productPrices[i].innerHTML = `Price: ${(masterVariant.prices[0] as Prices).value.centAmount / 100}€`;
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
}

interface filteredData {
  count: number;
  limit: 20;
  offset: number;
  results: Array<ProductsArrF>;
  total: number;
}

function createFilteredProductCards(dataProducts: filteredData) {
  const numOfProducts = dataProducts.total;

  const wrapperProductCarts = document.querySelector('.wrapper-main') as HTMLDivElement;
  const productsWrapper = document.querySelector('.product-wrapper') as HTMLElement;
  productsWrapper.innerHTML = '';
  productContainerElem(productsWrapper);
  wrapperProductCarts.append(productsWrapper);
  const productContainer = document.querySelector('.product-container') as HTMLDivElement;

  for (let i = 0; i < numOfProducts - 1; i += 1) {
    productsWrapper.appendChild(productContainer.cloneNode(true));
  }

  for (let i = 0; i < numOfProducts; i += 1) {
    const { name, description } = dataProducts.results[i];
    const productImagesArr = Array.from(document.querySelectorAll('.product-image img')) as Array<HTMLImageElement>;
    const productNamesArr = Array.from(document.querySelectorAll('.product-name'));
    const productDescriptionsArr = Array.from(document.querySelectorAll('.product-description'));
    const productPrices = Array.from(document.querySelectorAll('.price'));
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

function overlinePrice(prices: Array<HTMLElement>, discounts: Array<HTMLElement>) {
  return discounts.forEach((discount, i) => {
    if (discount.innerHTML) {
      prices[i].setAttribute('style', 'text-decoration: line-through');
    }
  });
}

async function getDiscountsInfo(token: string, data: ProductsListData, SKU: Array<string>) {
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
        const originalPrice = data.results[i].masterData.staged.masterVariant.prices[0].value.centAmount / 100;
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

async function getProductList(token: string) {
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
      createProductCards(data);
      const SKUArr: Array<string> = [];
      for (let i = 0; i < data.total; i += 1) {
        SKUArr.push(data.results[i].masterData.staged.masterVariant.sku);
      }
      getDiscountsInfo(token, data, SKUArr);
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

    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.results.length; i += 1) {
      console.log(data.results[i].name);
    }
    createFilteredProductCards(data);
    return data;
  } catch (err) {
    return err;
  }
}

// sorting request
// ?sort=name.en-US+asc
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
    console.log(dataSorted);
    createFilteredProductCards(dataSorted);
    return dataSorted;
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
      getProductList(data.access_token);
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
        const test = Object.entries(dataCheckboxes).reduce((acc: Array<string>, item) => {
          acc.push(`filter=variants.attributes.${item[0]}-attribute:${item[1].join(',')}`);
          return acc;
        }, []);
        getFilteredList(data.access_token, test.join('&'));
      });
      addEventHandler('sort-name', 'click', () => {
        console.log('works');
        const clickedButtonName = document.querySelector('.sort-name') as HTMLElement;
        const clickedButtonPriceL = document.querySelector('.sort-price-lowest') as HTMLElement;
        const clickedButtonPriceH = document.querySelector('.sort-price-highest') as HTMLElement;
        clickedButtonName.classList.toggle('active');
        clickedButtonPriceL.classList.remove('active');
        clickedButtonPriceH.classList.remove('active');
        getSortedElements(data.access_token, '?sort=name.en-US+asc');
      });
      addEventHandler('sort-price-lowest', 'click', () => {
        console.log('works');
        const clickedButtonName = document.querySelector('.sort-name') as HTMLElement;
        const clickedButtonPriceL = document.querySelector('.sort-price-lowest') as HTMLElement;
        const clickedButtonPriceH = document.querySelector('.sort-price-highest') as HTMLElement;
        clickedButtonName.classList.remove('active');
        clickedButtonPriceL.classList.toggle('active');
        clickedButtonPriceH.classList.remove('active');
        getSortedElements(data.access_token, 'search?sort=price+asc');
      });
      addEventHandler('sort-price-highest', 'click', () => {
        console.log('works');
        const clickedButtonName = document.querySelector('.sort-name') as HTMLElement;
        const clickedButtonPriceL = document.querySelector('.sort-price-lowest') as HTMLElement;
        const clickedButtonPriceH = document.querySelector('.sort-price-highest') as HTMLElement;
        clickedButtonName.classList.remove('active');
        clickedButtonPriceH.classList.toggle('active');
        clickedButtonPriceL.classList.remove('active');
        getSortedElements(data.access_token, 'search?sort=price+desc');
      });
    }
  } catch (err) {
    console.log(err);
  }
}
