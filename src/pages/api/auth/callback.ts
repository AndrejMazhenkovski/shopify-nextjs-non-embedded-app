import shopify from '../../../lib/shopify';
import { ApiRequest, NextApiResponse } from '@types';
import customSessionHandler from '../../../lib/customSessionCli3';

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  try {
    const callbackResponse = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callbackResponse;
    await customSessionHandler.storeSession(session);

    const webhooks = await shopify.webhooks.register({
      session,
    });

    // const session = await Shopify.Auth.validateAuthCallback(
    //   req,
    //   res,
    //   req.query
    // );

    // const webhooks = await Shopify.Webhooks.Registry.registerAll({
    //   shop: session.shop,
    //   accessToken: session.accessToken,
    // });

    Object.keys(webhooks).forEach((webhook) => {
      if (webhooks[webhook][0].success === true) {
        console.log(`Registered ${webhook} webhook`);
      } else {
        console.log(`Failed to register ${webhook} webhook: ${webhooks}`);
      }
    });

    //Redirect to app after auth
    res.redirect(`/app?host=${req.query.host}&shop=${req.query.shop}`);
  } catch (error) {
    console.error('Error occured at /auth/callback', error);
  }

  // res.redirect(`/app?host=${req.query.host}&shop=${req.query.shop}`);
}
