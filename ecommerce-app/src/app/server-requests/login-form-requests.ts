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

interface PasswordFlow {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export default async function checkCustomer(email: string, password: string) {
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
  const passwordFlowData = (await response1.json()) as PasswordFlow;

  async function customerToken(passwordFlowDataParam: string) {
    const response = await fetch(`https://api.europe-west1.gcp.commercetools.com/${ProcessEnv.PROJECT_KEY}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${`${passwordFlowDataParam}`}`,
      },
    });
    const customerTokenData = await response.json();
    console.log(customerTokenData);
  }

  customerToken(passwordFlowData.access_token);
}
