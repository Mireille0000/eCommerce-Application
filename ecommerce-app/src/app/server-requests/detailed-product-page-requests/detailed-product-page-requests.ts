import { ProcessEnvCatalog } from '../catalog-product-page-requests/catalog-product-page-requests';

interface MasterVariantData {
  sku: string;
  key: string;
  prices: [
    {
      id: string;
      value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
      };
    },
  ];
  images: [{ url: string }];
}

interface StagedInterface {
  name: { 'en-US': string };
  description: { 'en-US': string };
  masterVariant: MasterVariantData;
}

interface masterDataInterface {
  staged: StagedInterface;
}

interface Product {
  id: string;
  masterData: masterDataInterface;
  key: string;
}

function displayDataOnPage(data: Product) {
  /* data: Product image: string, name: string, desctiption: string, price: number, discount?: number, discountedPrice?: number */
  const { name, description } = data.masterData.staged;
  const { prices, images } = data.masterData.staged.masterVariant;
  console.log(data.key);

  const image = document.querySelector('.product-card-image img') as HTMLImageElement;
  image.src = images[0].url;
  image.alt = 'Product image';
  const productName = document.querySelector('.product-card-name') as HTMLDivElement;
  console.log(productName);
  productName.innerHTML = name['en-US'];
  const productDescription = document.querySelector('.product-card-description') as HTMLDivElement;
  productDescription.innerHTML = description['en-US'];
  const productPrice = document.querySelector('.product-card-prices .product-card-price') as HTMLSpanElement;
  productPrice.innerHTML = `Price: ${prices[0].value.centAmount / 100}€`;
}

async function getKeys(token: string) {
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
      const keys: Array<string> = [];
      for (let i = 0; i < data.results.length; i += 1) {
        keys.push(data.results[i].key);
      }
      console.log(data, keys);
      return data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getProductByKey(token: string, key: string) {
  try {
    const responseProduct = await fetch(
      `
        https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCatalog.PROJECT_KEY}/products/key=${key}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const productData = await responseProduct.json();
    if (productData.status === 400 || productData.status === 401) {
      const error = new Error(productData.message);
      throw error;
    } else {
      //   console.log(productData);
      displayDataOnPage(productData);
      return productData;
    }
  } catch (err) {
    return err;
  }
}

export default async function getToken() {
  try {
    const response = await fetch(
      `https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Basic ${btoa(`${ProcessEnvCatalog.CLIENT_ID}:${ProcessEnvCatalog.SECRET}`)}`,
        },
      }
    );
    const responseToken = await response.json();
    if (responseToken.status === 400 || responseToken.status === 401) {
      const error = new Error(responseToken.message);
      throw error;
    } else {
      getProductByKey(responseToken.access_token, 'staff-4');
      getKeys(responseToken.access_token);
      return responseToken;
    }
  } catch (err) {
    return err;
  }
}
