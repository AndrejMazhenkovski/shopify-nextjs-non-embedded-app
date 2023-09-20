import shopify from '@lib/shopify';
import Shopify from '@lib/shopify';
import { ApiRequest, NextApiResponse } from '@types';

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const shop = req.query.shop;

  if (!shop) {
    res.redirect('/login');
  }

  return await shopify.auth.begin({
    shop,
    callbackPath: '/api/auth/callback',
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  });
  // const authRoute = await Shopify.Auth.beginAuth(req, res, shop, '/api/auth/callback', true)

  // res.redirect(authRoute);
}
