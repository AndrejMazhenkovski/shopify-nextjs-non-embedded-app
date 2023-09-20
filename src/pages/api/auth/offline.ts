import shopify from '@lib/shopify';

import { ApiRequest, NextApiResponse } from '@types';

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const shop = req.query.shop;

  if (!shop) {
    res.redirect('/login');
  }

  return await shopify.auth.begin({
    shop,
    callbackPath: '/api/auth/offline-callback',
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  });

  // const authRoute = await Shopify.Auth.beginAuth(req, res, shop, '/api/auth/offline-callback', false)

  //   res.redirect(authRoute);
}
