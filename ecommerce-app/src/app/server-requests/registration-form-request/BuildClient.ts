import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export const ProcessEnv = {
  CTP_PROJECT_KEY: 'ecommerce-app-f-devs',
  CTP_CLIENT_SECRET: 'xDUVyoWqOTWPt2-sSrUCze6-kmqGj9em',
  CTP_CLIENT_ID: '6BV84XVVIu9ydovWItKwzrNC',
  CTP_AUTH_URL: 'https://auth.europe-west1.gcp.commercetools.com',
  CTP_API_URL: 'https://api.europe-west1.gcp.commercetools.com',
  CTP_SCOPES: 'manage_project:ecommerce-app-f-devs',
};
// export const ProcessEnv = {
//   CTP_PROJECT_KEY: 'ecommerce-app-f-devs',
//   CTP_CLIENT_SECRET: '3_H4mVCvUdI20gsjOgk-g1ItHRYWSBUI',
//   CTP_CLIENT_ID: 'vdKc7wDKkfWRytQ8EN1DqH9-',
//   CTP_AUTH_URL: 'https://auth.europe-west1.gcp.commercetools.com',
//   CTP_API_URL: 'https://api.europe-west1.gcp.commercetools.com',
//   CTP_SCOPES:
//     'create_anonymous_token:ecommerce-app-f-devs view_orders:ecommerce-app-f-devs manage_my_business_units:ecommerce-app-f-devs manage_my_profile:ecommerce-app-f-devs manage_categories:ecommerce-app-f-devs manage_my_quote_requests:ecommerce-app-f-devs manage_api_clients:ecommerce-app-f-devs manage_customers:ecommerce-app-f-devs manage_my_quotes:ecommerce-app-f-devs introspect_oauth_tokens:ecommerce-app-f-devs',
// };

const projectKey = ProcessEnv.CTP_PROJECT_KEY as string;
const scopes = [ProcessEnv.CTP_SCOPES] as string[];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: ProcessEnv.CTP_AUTH_URL as string,
  projectKey,
  credentials: {
    clientId: ProcessEnv.CTP_CLIENT_ID as string,
    clientSecret: ProcessEnv.CTP_CLIENT_SECRET as string,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: ProcessEnv.CTP_API_URL as string,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default ctpClient;
