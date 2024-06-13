import { ProcessEnvCartManipulationgs } from '../cart-catalog-requests/cart-catalog-requests'; // new API

const ProcessEnv = {
  PROJECT_KEY: 'ecommerce-app-f-devs',

  CLIENT_ID: 'V2c4_g0WuXk9a76Mpi2SNZF0',

  SECRET: 'fUQ87UVBzwinq_JJYBbqsJGFOuYBZGQk',
};

console.log(ProcessEnv);

async function getCustomerToken(passwordFlowDataParam: string) {
  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/${ProcessEnvCartManipulationgs.PROJECT_KEY}/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${`${passwordFlowDataParam}`}`,
        },
      }
    );

    if (response.status === 401) {
      throw new Error('Sign up');
    } else {
      const customerTokenData = await response.json();
      console.log(customerTokenData);
      window.location.hash = 'main-page';
    }
  } catch (err) {
    const mute = err;
    console.log('Invalid access token', mute);
  }
}

async function getPasswordFlow(email: string, password: string, errorMessageElem: string) {
  try {
    const response1 = await fetch(
      `https://auth.europe-west1.gcp.commercetools.com/oauth/${ProcessEnvCartManipulationgs.PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${ProcessEnvCartManipulationgs.CLIENT_ID}:${ProcessEnvCartManipulationgs.SECRET}`)}`,
        },
      }
    );
    const passwordFlowData = await response1.json();
    if (response1.status === 400) {
      const error = new Error(`${passwordFlowData.message}`);
      const errorElem = document.querySelector(`.${errorMessageElem}`) as HTMLElement;
      errorElem.innerHTML = `${passwordFlowData.message} Check your email or password`;
      setTimeout(() => errorElem.remove(), 4000);
      throw error.message;
    } else {
      return passwordFlowData;
    }
  } catch (err) {
    const mute = err as Error;
    const errorElem = document.querySelector(`.auth-error-message`) as HTMLElement;
    if (!errorElem.innerHTML) {
      errorElem.innerHTML = `${mute.message}`;
      setTimeout(() => errorElem.remove(), 4000);
    }
    return mute;
  }
}

export default async function checkCustomer(email: string, password: string, errorMessageElem: string) {
  try {
    const passwordFlowData = await getPasswordFlow(email, password, errorMessageElem);
    const tokens = {
      access_token: `${passwordFlowData.access_token}`,
      refresh_token: `${passwordFlowData.refresh_token}`,
    };

    if (passwordFlowData.access_token && passwordFlowData.refresh_token) {
      localStorage.setItem('data', JSON.stringify(tokens));
    }

    getCustomerToken(passwordFlowData.access_token);
  } catch (err) {
    const mute = err;
    console.error(mute);
    console.log('Invalid email and password');
  }
}
