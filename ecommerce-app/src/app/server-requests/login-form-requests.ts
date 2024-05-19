const ProcessEnv = {
  PROJECT_KEY: 'ecommerce-app-f-devs',

  CLIENT_ID: 'V2c4_g0WuXk9a76Mpi2SNZF0',

  SECRET: 'fUQ87UVBzwinq_JJYBbqsJGFOuYBZGQk',
};

// export default async function postRequest() {
//   const response = await fetch(
//     `https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Basic ${btoa(`${ProcessEnv.CLIENT_ID}:${ProcessEnv.SECRET}`)}`,
//       },
//     }
//   );
//   console.log(response.json());
// }

// verify user

// interface PasswordFlow {
//   access_token: string;
//   expires_in: number;
//   refresh_token: string;
//   scope: string;
//   token_type: string;
// }

async function getCustomerToken(passwordFlowDataParam: string) {
  try {
    const response = await fetch(`https://api.europe-west1.gcp.commercetools.com/${ProcessEnv.PROJECT_KEY}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${`${passwordFlowDataParam}`}`,
      },
    });

    if (response.status === 401) {
      throw new Error('Sign up');
    } else {
      const customerTokenData = await response.json();
      console.log(customerTokenData);
    }
  } catch (err) {
    const mute = err;
    console.log('Invalid access token', mute);
  }
}

async function getPasswordFlow(email: string, password: string, errorMessageElem: string) {
  const response1 = await fetch(
    `https://auth.europe-west1.gcp.commercetools.com/oauth/${ProcessEnv.PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${ProcessEnv.CLIENT_ID}:${ProcessEnv.SECRET}`)}`,
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
}

export default async function checkCustomer(email: string, password: string, errorMessageElem: string) {
  try {
    const passwordFlowData = await getPasswordFlow(email, password, errorMessageElem);
    getCustomerToken(passwordFlowData.access_token);
  } catch (err) {
    const mute = err;
    console.error(mute);
    console.log('Invalid email and password');
  }
}
