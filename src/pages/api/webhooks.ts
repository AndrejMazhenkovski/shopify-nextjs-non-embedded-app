import shopify from '@lib/shopify';
import { ApiRequest, NextApiResponse } from '@types';

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  console.log('Incoming Webhook');
  if (req.method === 'POST') {
    try {
      //   const topic = req.headers['x-shopify-topic'] || '';
      //   const shop = req.headers['x-shopify-shop-domain'] || '';

      const buff = await buffer(req);
      const rawBody = buff.toString('utf8');
      // await Shopify.Webhooks.Registry.process(req, res)
      await shopify.webhooks.process({
        rawBody: rawBody,
        rawRequest: req,
        rawResponse: res,
      });
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  } else {
    res.status(403).send('Only POST is allowed');
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}
