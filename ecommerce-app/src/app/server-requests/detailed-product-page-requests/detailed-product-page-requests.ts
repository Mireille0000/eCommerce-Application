import { ProcessEnvCatalog } from '../catalog-product-page-requests/catalog-product-page-requests';
// import { ProductsListDataNew } from '../catalog-product-page-requests/interfaces-catalog-page';

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

export async function getDiscountProductInfo(token: string, data: Product, elem: string) {
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
      const productPrice = document.querySelector('.product-card-price') as HTMLElement;
      const productDiscount = document.querySelector('.product-card-discount') as HTMLElement;
      const productDiscountPrice = document.querySelector('.product-card-discount-price') as HTMLElement;
      // get skus of the discounted products
      const SKUData: Array<string> = discountAmount.split('"');
      const skuArr = SKUData.reduce((acc: Array<string>, sku, _, arr) => {
        if (arr.indexOf(sku) % 2 !== 0) {
          acc.push(sku);
        }
        return acc;
      }, []);

      //  display discount and price with discount
      const discount = discountsData.value.permyriad / 100;
      const originalPrice = data.masterData.staged.masterVariant.prices[0].value.centAmount / 100;
      if (skuArr.includes(elem)) {
        productDiscount.innerHTML = `Discount ${discount}%`;
        productDiscountPrice.innerHTML = `New Price: ${originalPrice * (1 - discount / 100)}€`;
        productPrice.setAttribute('style', 'text-decoration: line-through');
      }

      return skuArr;
    }
  } catch (err) {
    return err;
  }
}

function displayDataOnPage(data: Product) {
  const { name, description } = data.masterData.staged;
  const { prices, images } = data.masterData.staged.masterVariant;

  const image = document.querySelector('.product-card-image img') as HTMLImageElement;
  // modal
  const imageModal = document.querySelector('.image-container img') as HTMLImageElement;
  image.src = images[0].url;
  imageModal.src = images[0].url;
  imageModal.alt = 'Modal product image';
  image.alt = 'Product image';
  const productName = document.querySelector('.product-card-name') as HTMLDivElement;
  productName.innerHTML = name['en-US'];
  const productDescription = document.querySelector('.product-card-description') as HTMLDivElement;
  productDescription.innerHTML = description['en-US'];
  const productPrice = document.querySelector('.product-card-prices .product-card-price') as HTMLSpanElement;
  productPrice.innerHTML = `Price: ${prices[0].value.centAmount / 100}€`;
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
      displayDataOnPage(productData);
      getDiscountProductInfo(token, productData, productData.masterData.staged.masterVariant.sku);
      return productData;
    }
  } catch (err) {
    return err;
  }
}

export default async function getToken(key: string) {
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
      getProductByKey(responseToken.access_token, key); //
      return responseToken;
    }
  } catch (err) {
    return err;
  }
}
