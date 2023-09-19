const appUninstallHandler = async (topic, shop, webhookRequestBody) => {
  const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;

  const headers = {
    Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
  };

  const webhookBody = JSON.parse(webhookRequestBody);

  async function deleteKeys() {
    const keysResponse = await fetch(`${upstashRedisRestUrl}/keys/*`, {
      headers,
    });
    const keys = await keysResponse.json();

    for (const key of keys.result) {
      const valueResponse = await fetch(`${upstashRedisRestUrl}/get/${key}`, {
        method: 'GET',
        headers,
      });
      const value = await valueResponse.text();
      console.log('Value: ', value);
      if (value.includes(shop)) {
        console.log(`Deleting key: ${key}`);

        await fetch(`${upstashRedisRestUrl}/del/${key}`, {
          method: 'GET',
          headers,
        });
      }
    }
  }

  console.log('App Uninstalled from', shop);

  deleteKeys();
};

export default appUninstallHandler;
