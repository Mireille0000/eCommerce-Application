import { ProcessEnvCartManipulationgs } from '../../cart-catalog-requests/cart-catalog-requests';

export async function getProductsPartly(accessToken: string, skip: number, limit = 7) {
  try {
    const reponseProductsPart = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/product-projections/search?limit=${limit}&skip=${skip}`,
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
      console.log(dataProductsPart.message);
      throw error;
    } else {
      console.log(dataProductsPart);
      return dataProductsPart;
    }
  } catch (err) {
    return err;
  }
}

export async function getProductsPartByToken() {
  try {
    const reponseToken = await fetch(
      `https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Basic ${btoa}(${ProcessEnvCartManipulationgs.CLIENT_ID}:${ProcessEnvCartManipulationgs.SECRET})`,
        },
      }
    );
    const dataToken = await reponseToken.json();

    if (dataToken.message) {
      const error = new Error(dataToken.message);
      console.log(dataToken.message);
      throw error;
    } else {
      const skipVar = 0; // will change once the page changes
      getProductsPartly(dataToken, skipVar);
      console.log(dataToken);
      return dataToken;
    }
  } catch (err) {
    return err;
  }
}
