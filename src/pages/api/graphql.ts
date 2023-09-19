import customSessionHandler from '@lib/customSessionCli3';
import shopify from '@lib/shopify';
import { ApiRequest, NextApiResponse } from '@types';

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  try {
    //  const response = await Shopify.Utils.graphqlProxy(req, res);
    const sessionId = await shopify.session.getCurrentId({
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });
    const session = await customSessionHandler.loadSession(sessionId);
    const response = await shopify.clients.graphqlProxy({
      session,
      rawBody: req.body,
    });
    console.log('It works!');
    res.status(200).send(response.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
