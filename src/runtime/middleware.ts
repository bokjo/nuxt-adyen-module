import { PaymentCompletionDetails } from '@adyen/api-library/lib/src/typings/checkout/paymentCompletionDetails'
import { NotificationRequestItem } from '@adyen/api-library/lib/src/typings/notification/notificationRequestItem'
import { AdyenConfigOptions } from './api'
import { AdyenServerApi } from './server'
import { redirectByCode } from './utils'

const bodyParser = require('body-parser')
const app = require('express')()

export const createMiddleware = (configuration: AdyenConfigOptions) => {
  const adyenServerApi = new AdyenServerApi(configuration)
  app.use(bodyParser.json())

  // eslint-disable-next-line
  app.get("/api/getPaymentDataStore", async (req: any, res: any) => {
    const result = await adyenServerApi.getPaymentDataStore()

    res.send(result)
  })

  // eslint-disable-next-line
  app.get("/api/getPaymentMethods", async (req: any, res: any) => {
    const result = await adyenServerApi.getPaymentMethods()

    res.send({
      result,
      clientKey: configuration.clientKey,
      environment: configuration.environment
    })
  })

  // eslint-disable-next-line
  app.post("/api/createPaymentSession", async (req: any, res: any) => {
    const result = await adyenServerApi.createPaymentSession(req.body)

    res.send(result)
  })

  // eslint-disable-next-line
  app.post("/api/initiatePayment", async (req: any, res: any) => {
    const result = await adyenServerApi.initiatePayment(req)

    res.send(result)
  })

  // eslint-disable-next-line
  app.post("/api/submitAdditionalDetails", async (req: any, res: any) => {
    const payload = {
      details: req.body.details,
      paymentData: req.body.paymentData
    }
    const orderRef = req?.query?.orderRef

    const response = await adyenServerApi.getPaymentsDetails(payload, orderRef)

    res.send(response)
  })

  // eslint-disable-next-line
  app.get("/api/handleShopperRedirect", async (req: any, res: any) => {
    const redirect = req.query
    const details: PaymentCompletionDetails = {}
    if (redirect.redirectResult) {
      details.redirectResult = redirect.redirectResult
    } else if (redirect.payload) {
      details.payload = redirect.payload
    }
    const orderRef = req?.query?.orderRef

    const response = await adyenServerApi.getPaymentsDetails(
      { details },
      orderRef
    )

    redirectByCode(res, response.resultCode)
  })

  // eslint-disable-next-line
  app.post("/api/webhook/notification", (req: any, res: any) => {
    const notificationRequestItems: NotificationRequestItem[] =
      req.body.notificationItems

    adyenServerApi.handleNotificationWebhook(notificationRequestItems)

    res.send('[accepted]')
  })

  return app
}
