const ProcessEnvCatalog = {
  PROJECT_KEY: 'ecommerce-app-f-devs',

  CLIENT_ID: 'fGkJ1K9vPXR6Vee9E-SIkaJC',

  SECRET: 'o-i1eGtuwKbH0T8FgH4Gq-Elbbr6sBEf',
};

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
      return data; //
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

    console.log(data.access_token);
  } catch (err) {
    console.log(err);
  }
}
