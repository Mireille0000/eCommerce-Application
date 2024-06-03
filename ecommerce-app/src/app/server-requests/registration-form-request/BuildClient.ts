import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export const ProcessEnv = {
  CTP_PROJECT_KEY: 'ecommerce-app-f-devs',
  CTP_CLIENT_SECRET: 'xDUVyoWqOTWPt2-sSrUCze6-kmqGj9em',
  CTP_CLIENT_ID: '6BV84XVVIu9ydovWItKwzrNC',
  CTP_AUTH_URL: 'https://auth.europe-west1.gcp.commercetools.com',
  CTP_API_URL: 'https://api.europe-west1.gcp.commercetools.com',
  CTP_SCOPES: 'manage_project:ecommerce-app-f-devs',
};

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
