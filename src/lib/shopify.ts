import Shopify, {
  ApiVersion,
  DeliveryMethod,
  Session,
  shopifyApi,
} from '@shopify/shopify-api';

import '@shopify/shopify-api/adapters/node';
import appUninstallHandler from '../webhooks/app_uninstalled';

// Shopify.Context.initialize({
//   API_KEY: process.env.SHOPIFY_API_KEY,
//   API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
//   SCOPES: process.env.SCOPES.split(','),
//   HOST_NAME: process.env.HOST.replace(/https:\/\//, ''),
//   IS_EMBEDDED_APP: false,
//   API_VERSION: ApiVersion.April22,
//   SESSION_STORAGE: new CustomSessionStorage(),
// });

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  scopes: process.env.SCOPES.split(','),
  hostName: process.env.HOST.replace(/https:\/\//, ''),
  isEmbeddedApp: false,
  apiVersion: ApiVersion.July23,
  hostScheme: 'https',
  logger: { level: 0 },
});

// Shopify.Webhooks.Registry.addHandlers(webhooks);

shopify.webhooks.addHandlers({
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: '/api/webhooks/app_uninstalled',
    callback: appUninstallHandler,
  },
});

export default shopify;
