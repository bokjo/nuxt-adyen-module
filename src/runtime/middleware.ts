import { PaymentCompletionDetails } from '@adyen/api-library/lib/src/typings/checkout/paymentCompletionDetails'
import { NotificationRequestItem } from '@adyen/api-library/lib/src/typings/notification/notificationRequestItem'
import { AdyenConfigOptions } from './api'
import { AdyenServerApi } from './server'
import { redirectByCode } from './utils'

const bodyParser = require('body-parser')
const app = require('express')()

export const createMiddleware = (configuration: AdyenConfigOptions) => {
  const adyenClientAPI = new AdyenServerApi(configuration)
  app.use(bodyParser.json())

  // eslint-disable-next-line
  app.get("/api/getPaymentMethods", async (req: any, res: any) => {
    const result = await adyenClientAPI.getPaymentMethods()

    res.send({ result, clientKey: configuration.clientKey, environment: configuration.environment })
  })

  // eslint-disable-next-line
  app.post('/api/createPaymentSession', async (req: any, res: any) => {
    const result = await adyenClientAPI.createPaymentSession(req.body)

    res.send(result)
  })

  // eslint-disable-next-line
  app.post("/api/initiatePayment", async (req: any, res: any) => {
    const result = await adyenClientAPI.initiatePayment(req)

    res.send(result)
  })

  // eslint-disable-next-line
  app.post("/api/submitAdditionalDetails", async (req: any, res: any) => {
    const payload = {
      details: req.body.details,
      paymentData: req.body.paymentData
    }

    const response = await adyenClientAPI.getPaymentsDetails(payload)

    return response
  })

  // eslint-disable-next-line
  app.post("/api/handleShopperRedirect", async (req: any, res: any) => {
    const redirect = req.body
    const details: PaymentCompletionDetails = {}
    if (redirect.redirectResult) {
      details.redirectResult = redirect.redirectResult
    } else if (redirect.payload) {
      details.payload = redirect.payload
    }

    const response = await adyenClientAPI.getPaymentsDetails({ details })

    redirectByCode(res, response.resultCode)
  })

  // eslint-disable-next-line
  app.post("/api/webhook/notification", (req: any, res: any) => {
    // TODO: finish developing this webhook
    console.log('Received webhook')
    // get the notification request from POST body
    const notificationRequestItems: NotificationRequestItem[] = req.body.notificationItems

    console.log(notificationRequestItems)

    // notificationRequestItems.forEach(({ NotificationRequestItem }) => {
    //   console.info("Received webhook notification", NotificationRequestItem);
    //   // Process the notification based on the eventCode
    //   if (NotificationRequestItem.eventCode === "CANCEL_OR_REFUND") {
    //     if (validator.validateHMAC(NotificationRequestItem, process.env.ADYEN_HMAC_KEY)) {
    //       const payment = findPayment(NotificationRequestItem.pspReference);

    //       if (NotificationRequestItem.success === "true") {
    //         // update with additionalData.modification.action
    //         if (
    //           "modification.action" in NotificationRequestItem.additionalData &&
    //           "refund" === NotificationRequestItem.additionalData["modification.action"]
    //         ) {
    //           payment.status = "Refunded";
    //         } else {
    //           payment.status = "Cancelled";
    //         }
    //       } else {
    //         // update with failure
    //         payment.status = "Refund failed";
    //       }
    //     } else {
    //       console.error("NotificationRequest with invalid HMAC key received");
    //     }
    //   } else {
    //     // do nothing
    //     console.info("skipping non actionable webhook");
    //   }
    // });

    res.send('[accepted]')
  })

  return app
}
