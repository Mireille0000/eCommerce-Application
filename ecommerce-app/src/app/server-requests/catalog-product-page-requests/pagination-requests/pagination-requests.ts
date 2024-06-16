import { ProcessEnvCartManipulationgs } from '../../cart-catalog-requests/cart-catalog-requests';
import { createProductCards, getDiscountsInfo } from '../catalog-product-page-requests';

export default async function getProductsPartly(accessToken: string, offset: number, limit = 4) {
  try {
    const reponseProductsPart = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/product-projections/search?sort=createdAt+asc&limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const dataProductsPart = await reponseProductsPart.json();

    if (dataProductsPart.message) {
      const error = new Error(dataProductsPart.message);
      throw error;
    } else {
      createProductCards(accessToken, dataProductsPart);
      const SKUArr: Array<string> = [];

      for (let i = 0; i < dataProductsPart.count; i += 1) {
        SKUArr.push(dataProductsPart.results[i].masterVariant.sku);
      }
      getDiscountsInfo(accessToken, dataProductsPart, SKUArr);
      return dataProductsPart;
    }
  } catch (err) {
    return err;
  }
}
