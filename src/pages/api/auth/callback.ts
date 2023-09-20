import shopify from '../../../lib/shopify';
import { ApiRequest, NextApiResponse } from '@types';
import customSessionHandler from '../../../lib/customSessionCli3';

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  try {
    console.log('Before shopify.auth.callback');
    const callbackResponse = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
    console.log('After shopify.auth.callback');

    const { session } = callbackResponse;

    console.log('Before customSessionHandler.storeSession');
    await customSessionHandler.storeSession(session);
    console.log('After customSessionHandler.storeSession');

    console.log('Before shopify.webhooks.register');
    const webhooks = await shopify.webhooks.register({
      session,
    });
    console.log('After shopify.webhooks.register');

    console.log('Webhooks:', webhooks);

    // const session = await Shopify.Auth.validateAuthCallback(
    //   req,
    //   res,
    //   req.query
    // );

    // const webhooks = await Shopify.Webhooks.Registry.registerAll({
    //   shop: session.shop,
    //   accessToken: session.accessToken,
    // });
    // if (webhooks && Object.keys(webhooks).length > 0) {
    //   Object.keys(webhooks).forEach((webhook) => {
    //     if (webhooks[webhook][0].success === true) {
    //       console.log(`Registered ${webhook} webhook`);
    //     } else {
    //       console.log(`Failed to register ${webhook} webhook: ${webhooks}`);
    //     }
    //   });
    // }

    //Redirect to app after auth
    // res.redirect(`/app?host=${req.query.host}&shop=${req.query.shop}`);
  } catch (error) {
    console.error('Error occured at /auth/callback', error);
  }

  res.redirect(`/app?host=${req.query.host}&shop=${req.query.shop}`);
}
