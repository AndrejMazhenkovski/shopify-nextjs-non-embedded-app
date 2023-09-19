import shopify from '@lib/shopify';
import { ApiRequest, NextApiResponse } from '@types';

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  console.log('Incoming Webhook');
  if (req.method === 'POST') {
    const topic = req.headers['x-shopify-topic'] || '';
    const shop = req.headers['x-shopify-shop-domain'] || '';

    try {
      const bodyChunks = [];
      req.on('data', (chunk) => {
        bodyChunks.push(chunk);
      });
      req.on('end', () => {
        const rawBody = Buffer.concat(bodyChunks).toString('utf8');
        console.log('Parsed raw body:', rawBody);

        shopify.webhooks.process({
          rawBody: rawBody,
          rawRequest: req,
          rawResponse: res,
        });
        console.log(
          `Webhook ${topic} from ${shop} processed, returned status code 200`
        );

        res.status(200).send(`Webhook ${topic} from ${shop} processed`);
      });
    } catch (error) {
      console.log(`Failed to process webhook ${topic} from ${shop}: ${error}`);
      res.status(500).send(`Webhook ${topic} from ${shop} failed!`);
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
