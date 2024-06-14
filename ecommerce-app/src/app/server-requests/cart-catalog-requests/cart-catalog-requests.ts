export enum ProcessEnvCartManipulationgs {
  PROJECT_KEY = 'ecommerce-app-f-devs',

  CLIENT_ID = 'rjFslevlXRyp9VKFvupyz0lm',

  SECRET = 'O3_ciV_7YqV-uoDfAO9dxXmmOZ7eBz4M',
}
// delete a cart when the page is reloaded

export async function deleteAnonymousUserCart(tokenAnonymousSessions: string, cartId: string, version: number) {
  try {
    const responseAnonymousUserCart = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/carts/${cartId}?version=${version}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${tokenAnonymousSessions}`,
        },
      }
    );
    const dataAnonymousUserCart = await responseAnonymousUserCart.json();

    if (dataAnonymousUserCart.message === 401 || dataAnonymousUserCart.message === 400) {
      const error = new Error(`${dataAnonymousUserCart.message}`);
      throw error;
    } else {
      return dataAnonymousUserCart;
    }
  } catch (err) {
    return err;
  }
}

// add a product into your cart (me or for an anonymous user)
export interface ProductToCart {
  version?: number;
  actions: [
    {
      action?: string;
      productId: string;
      variantId?: number;
      quantity?: number;
    },
  ];
}

export async function addProduct(tokenAnonymousSessions: string, cartId: string, product: ProductToCart) {
  try {
    const responseMyNewProduct = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/carts/${cartId}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${tokenAnonymousSessions}`,
        },
        body: JSON.stringify(product),
      }
    );
    const dataMyNewProduct = await responseMyNewProduct.json();

    if (dataMyNewProduct.message === 401 || dataMyNewProduct.message === 400) {
      const error = new Error(`${dataMyNewProduct.message}`);
      throw error;
    } else {
      return dataMyNewProduct;
    }
  } catch (err) {
    return err;
  }
}

export async function addMyProduct(tokenPasswordFlow: string, cartId: string, product: ProductToCart) {
  try {
    const responseMyNewProduct = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/me/carts/${cartId}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${tokenPasswordFlow}`,
        },
        body: JSON.stringify(product),
      }
    );
    const dataMyNewProduct = await responseMyNewProduct.json();

    if (dataMyNewProduct.message === 401 || dataMyNewProduct.message === 400) {
      const error = new Error(`${dataMyNewProduct.message}`);
      throw error;
    } else {
      return dataMyNewProduct;
    }
  } catch (err) {
    return err;
  }
}

export async function getProductByKey(token: string, key: string, cartVersion: number, myCartId?: string) {
  // token should be a commun token or an anonymous user's token
  try {
    const responseChosenProduct = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/products/key=${key}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const dataChosenProduct = await responseChosenProduct.json();
    const cartId = JSON.parse(sessionStorage.getItem('cartDataAnon') as string);
    const accessTokenAnon = JSON.parse(sessionStorage.getItem('anonymousTokensData') as string);
    const accessTokenLogedIn = JSON.parse(localStorage.getItem('data') as string);
    const productToAdd: ProductToCart = {
      version: cartVersion,
      actions: [
        {
          action: 'addLineItem',
          productId: dataChosenProduct.id,
          variantId: 1,
          quantity: 1,
        },
      ],
    };
    if (!localStorage.getItem('data')) {
      const modalprogressIndicator = document.querySelector('.wrapper-progress-indicator') as HTMLDivElement;
      setTimeout(() => modalprogressIndicator.classList.remove('active'), 2000);
      addProduct(accessTokenAnon.access_token, cartId.id, productToAdd);
    } else {
      const modalprogressIndicator = document.querySelector('.wrapper-progress-indicator') as HTMLDivElement;
      setTimeout(() => modalprogressIndicator.classList.remove('active'), 2000);
      console.log('here?');
      addMyProduct(accessTokenLogedIn.access_token, myCartId as string, productToAdd);
      console.log(productToAdd);
    }
    return dataChosenProduct;
  } catch (err) {
    return err;
  }
}

// get cart info by id (???)

export async function getCartById(id: string, token: string, key: string) {
  try {
    const responseCartInfo = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/carts/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const dataCartInfo = await responseCartInfo.json();
    getProductByKey(token, key, dataCartInfo.version);
    console.log(dataCartInfo.version);
    return dataCartInfo;
  } catch (err) {
    return err;
  }
}

// create a cart (my cart and an anonymous cart)
export async function createMyCart(token: string, key: string) {
  try {
    const responseMyCartCreated = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/me/carts`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: `{"currency" : "EUR"}`,
      }
    );
    const dataMyCartCreated = await responseMyCartCreated.json();

    if (dataMyCartCreated.message === 401 || dataMyCartCreated.message === 400) {
      const error = new Error(`${dataMyCartCreated.message}`);
      throw error;
    } else {
      console.log(dataMyCartCreated);
      getProductByKey(token, key, dataMyCartCreated.version, dataMyCartCreated.id);
      return dataMyCartCreated;
    }
  } catch (err) {
    return err;
  }
}

async function createAnonymousUserCart(tokenAnonymousSessions: string, key: string) {
  try {
    const responseAnonymousUserCart = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/carts`,
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
      getProductByKey(tokenAnonymousSessions, key, dataAnonymousUserCart.version);
      if (!localStorage.getItem('data')) {
        sessionStorage.setItem('cartDataAnon', JSON.stringify(cartData));
        console.log(dataAnonymousUserCart.id);
      } else {
        sessionStorage.clear();
      }
      return dataAnonymousUserCart;
    }
  } catch (err) {
    return err;
  }
}

// get cart info with password flow access token
export async function getMyCartInfo(tokenPasswordFlow: string, key: string) {
  try {
    const responseMyCartInfo = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/me/carts`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${tokenPasswordFlow}`, // the access token from the password flow
        },
      }
    );
    const dataMyCartInfo = await responseMyCartInfo.json();
    console.log(dataMyCartInfo.results.length);
    if (dataMyCartInfo.results.length > 0) {
      console.log(key, tokenPasswordFlow);
      getProductByKey(tokenPasswordFlow, key, dataMyCartInfo.results[0].version, dataMyCartInfo.results[0].id); //
    } else if (dataMyCartInfo.results.length === 0) {
      createMyCart(tokenPasswordFlow, key);
    }
    return dataMyCartInfo;
  } catch (err) {
    return err;
  }
}

// a token for anonymous users (in this function we invoke createAnonymousUserCart)
export async function getAnonymousSessionToken(key: string) {
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
      createAnonymousUserCart(dataToken.access_token, key);
      const anonymousTokensObj = {
        access_token: dataToken.access_token,
        refresh_token: dataToken.refresh_token,
      };

      if (!sessionStorage.getItem('anonymousTokensData')) {
        sessionStorage.setItem('anonymousTokensData', JSON.stringify(anonymousTokensObj));
        console.log(dataToken.access_token);
      } else {
        console.log(sessionStorage.getItem('anonymousTokensData'));
      }

      return dataToken;
    }
  } catch (err) {
    return err;
  }
}
