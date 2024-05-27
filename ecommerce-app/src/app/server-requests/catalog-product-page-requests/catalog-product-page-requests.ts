import { ProductsListData } from './interfaces-catalog-page';

const ProcessEnvCatalog = {
  PROJECT_KEY: 'ecommerce-app-f-devs',

  CLIENT_ID: 'fGkJ1K9vPXR6Vee9E-SIkaJC',

  SECRET: 'o-i1eGtuwKbH0T8FgH4Gq-Elbbr6sBEf',
};

function createProductCard(data: ProductsListData) {
  const numOfProducts = data.total;

  const wrapperProductCarts = document.querySelector('.wrapper-main') as HTMLDivElement;
  const productContainer = document.querySelector('.product-container') as HTMLDivElement;

  for (let i = 0; i < numOfProducts - 1; i += 1) {
    wrapperProductCarts.appendChild(productContainer.cloneNode(true));
  }

  for (let i = 0; i < numOfProducts; i += 1) {
    const productImagesArr = Array.from(document.querySelectorAll('.product-image img')) as Array<HTMLImageElement>;
    const productNamesArr = Array.from(document.querySelectorAll('.product-name'));
    const productDescriptionsArr = Array.from(document.querySelectorAll('.product-description'));

    productImagesArr[i].src = `${data.results[i].masterData.staged.masterVariant.images[0].url}`;
    productImagesArr[i].alt = `${data.results[i].masterData.staged.name['en-US']}`;
    productNamesArr[i].innerHTML = `${data.results[i].masterData.staged.name['en-US']}`;
    productDescriptionsArr[i].innerHTML = `${data.results[i].masterData.staged.description['en-US']}`;
  }
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
      createProductCard(data);
      return data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getProductListByToken() {
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
  } catch (err) {
    console.log(err);
  }
}
