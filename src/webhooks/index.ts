const webhooks = {
  APP_UNINSTALLED: {
    path: '/api/webhooks',
    webhookHandler: async (topic, shop, body) => {
      console.log('App uninstalled old way');
    },
  },
};

export default webhooks;
