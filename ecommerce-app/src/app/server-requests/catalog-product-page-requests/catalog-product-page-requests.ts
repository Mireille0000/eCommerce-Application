import { ProductsListData, Prices } from './interfaces-catalog-page';

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
  console.log(productsWrapper);
  const productContainer = document.querySelector('.product-container') as HTMLDivElement;

  for (let i = 0; i < numOfProducts - 1; i += 1) {
    productsWrapper.appendChild(productContainer.cloneNode(true));
  }

  const attributes = [];
  for (let i = 0; i < numOfProducts; i += 1) {
    const { masterVariant, name, description } = dataProducts.results[i].masterData.staged;
    const productImagesArr = Array.from(document.querySelectorAll('.product-image img')) as Array<HTMLImageElement>;
    const productNamesArr = Array.from(document.querySelectorAll('.product-name'));
    const productDescriptionsArr = Array.from(document.querySelectorAll('.product-description'));
    const productPrices = Array.from(document.querySelectorAll('.price'));
    attributes.push(masterVariant.attributes);
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
  // console.log(dataProducts.results);
  // console.log(attributes);
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
    getProductList(data.access_token);
    // getDiscountsInfo(data.access_token);
  } catch (err) {
    console.log(err);
  }
}
