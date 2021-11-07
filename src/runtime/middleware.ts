import { AdyenClientOptions } from "./api";
import { AdyenServerApi } from "./server";

const bodyParser = require('body-parser');
const app = require('express')();

export const createMiddleware = (configuration: AdyenClientOptions) => {
  const adyenClientAPI = new AdyenServerApi(configuration);

  app.use(bodyParser.json());

  // eslint-disable-next-line
  app.all('/test', async (req, res) => {
    const result = await adyenClientAPI.createPaymentSession();

    res.send(result);
  })

  return app;
}
