import { PaymentCompletionDetails } from "@adyen/api-library/lib/src/typings/checkout/paymentCompletionDetails";
import { AdyenClientOptions } from "./api";
import { AdyenServerApi } from "./server";
import { redirectByCode } from "./utils";

const bodyParser = require('body-parser');
const app = require('express')();

export const createMiddleware = (configuration: AdyenClientOptions) => {
  const adyenClientAPI = new AdyenServerApi(configuration);
  app.use(bodyParser.json());

  // eslint-disable-next-line
  app.get("/api/getPaymentMethods", async (req, res) => {
    const result = await adyenClientAPI.getPaymentMethods();

    res.send({ result, clientKey: configuration.clientKey })
  });


  // eslint-disable-next-line
  app.post('/api/createPaymentSession', async (req, res) => {
    const result = await adyenClientAPI.createPaymentSession();

    res.send(result);
  })

  // eslint-disable-next-line
  app.post("/api/initiatePayment", async (req, res) => {
    const result = await adyenClientAPI.initiatePayment(req);

    res.send(result);
  });

  // eslint-disable-next-line
  app.post("/api/submitAdditionalDetails", async (req, res) => {
    const payload = {
      details: req.body.details,
      paymentData: req.body.paymentData
    };

    const response = await adyenClientAPI.getPaymentsDetails(payload);

    return response;
  });

  // eslint-disable-next-line
  app.all("/api/handleShopperRedirect", async (req, res) => {
    const redirect = req.method === "GET" ? req.query : req.body;
    const details: PaymentCompletionDetails = {};
    if (redirect.redirectResult) {
      details.redirectResult = redirect.redirectResult;
    } else if (redirect.payload) {
      details.payload = redirect.payload;
    }

    const response = await adyenClientAPI.getPaymentsDetails({ details });

    redirectByCode(res, response.resultCode);
  });

  return app;
}
