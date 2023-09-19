const appUninstallHandler = async (topic, shop, webhookRequestBody) => {
  try {
    const webhookBody = JSON.parse(webhookRequestBody);

    console.log('App Uninstalled from', shop);
  } catch (e) {
    console.error('Error sending payload forappUninstalled', e);
  }
};

export default appUninstallHandler;
