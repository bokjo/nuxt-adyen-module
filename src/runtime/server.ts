import { CheckoutAPI, Client, hmacValidator as HmacValidator, Modification } from '@adyen/api-library'
import { DetailsRequest } from '@adyen/api-library/lib/src/typings/checkout/detailsRequest'
import { PaymentResponse } from '@adyen/api-library/lib/src/typings/checkout/paymentResponse'
import { CreateCheckoutSessionResponse } from '@adyen/api-library/lib/src/typings/checkout/createCheckoutSessionResponse'
import { PaymentMethodsResponse } from '@adyen/api-library/lib/src/typings/checkout/paymentMethodsResponse'
import { NotificationRequestItem } from '@adyen/api-library/lib/src/typings/notification/notificationRequestItem'
import { AdyenCheckoutServer, AdyenConfigOptions, Amount, InitiatePaymentBody, LocalStore } from './api'
import { createBillingAddress, createCountryCode, createPaymentMethod, createUniqueReference, findCurrency, findPayment } from './utils'

export class AdyenServerApi implements AdyenCheckoutServer {
  private readonly checkout: CheckoutAPI
  private _config: AdyenConfigOptions
  public modification: Modification
  public validator: HmacValidator

  // in memory store for transaction
  private paymentStore: LocalStore = {}
  private originStore: LocalStore = {}

  constructor (config: AdyenConfigOptions) {
    this._config = config

    const client = new Client(config)

    this.modification = new Modification(client)

    this.checkout = new CheckoutAPI(client)

    this.validator = new HmacValidator()
  }

  async getPaymentDataStore (): Promise<LocalStore> {
    return new Promise((resolve, reject) => {
      resolve(this.paymentStore)
    })
  }

  async createPaymentSession ({ currency, value }: Amount): Promise<CreateCheckoutSessionResponse> {
    try {
      const response = await this.checkout.sessions({
        merchantAccount: this._config.merchantAccount,
        amount: {
          currency,
          value
        },
        reference: createUniqueReference(),
        returnUrl: this._config.returnUrl
      })

      return response
    } catch (err: any) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`)
      throw new Error(err)
    }
  }

  async getPaymentMethods (): Promise<PaymentMethodsResponse> {
    try {
      const response = await this.checkout.paymentMethods({
        channel: this._config.channel as any, // Cannot find the proper type due to Adyen namespace
        merchantAccount: this._config.merchantAccount
      })

      return response
    } catch (err: any) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`)
      throw new Error(err)
    }
  }

  async getPaymentsDetails (paymentDetailsRequest: DetailsRequest, orderRef: string) {
    try {
      const response = await this.checkout.paymentsDetails(paymentDetailsRequest)

      if (!response.action) {
        this.paymentStore[orderRef].paymentRef = response.pspReference
        this.paymentStore[orderRef].status = response.resultCode
      }

      return response
    } catch (err: any) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`)
      throw new Error(err)
    }
  }

  // eslint-disable-next-line
  async initiatePayment(req: any): Promise<PaymentResponse> {
    try {
      const shopperIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const initiatePaymentBody: InitiatePaymentBody = req.body
      const currency = findCurrency(initiatePaymentBody)
      const orderRef = createUniqueReference()

      const response = await this.checkout.payments({
        // TODO: issue with no amount
        amount: { currency, value: initiatePaymentBody?.amount?.value },
        reference: orderRef, // required
        merchantAccount: this._config.merchantAccount,
        channel: this._config.channel as any, // Cannot find the proper type due to Adyen namespace
        additionalData: {
          allow3DS2: true as any // Wrong Adyen typing. Each property of additionalData has to be string, while some properties require boolean values.
        },
        origin: this._config.origin, // required for 3ds2 native flow
        browserInfo: initiatePaymentBody.browserInfo as any, // required for 3ds2 | Issues with Adyen typing
        shopperIP, // required by some issuers for 3ds2
        returnUrl: `${this._config.returnUrl}?orderRef=${orderRef}`, // required for 3ds2 redirect flow
        paymentMethod: createPaymentMethod(initiatePaymentBody) as any, // Issues with Adyen typing
        // Below fields are required for Boleto:
        socialSecurityNumber: initiatePaymentBody.socialSecurityNumber,
        shopperName: initiatePaymentBody.shopper?.name,
        billingAddress: createBillingAddress(initiatePaymentBody),
        deliveryDate: new Date(),
        shopperStatement: `Payment statement for order ${orderRef}`,
        // Below fields are required for Klarna:
        countryCode: createCountryCode(initiatePaymentBody),
        shopperReference: createUniqueReference(),
        shopperEmail: initiatePaymentBody.shopper?.email,
        shopperLocale: initiatePaymentBody?.shopper?.locale,
        lineItems: initiatePaymentBody.lineItems
      })

      const { action } = response

      // save transaction in memory
      this.paymentStore[orderRef] = {
        amount: { currency, value: 1000 },
        reference: orderRef
      }

      if (action) {
        const originalHost = new URL(req.headers.referer)
        if (originalHost) {
          this.originStore[orderRef] = originalHost.origin
        }
      } else {
        this.paymentStore[orderRef].paymentRef = response.pspReference
        this.paymentStore[orderRef].status = response.resultCode
      }

      return response
    } catch (err: any) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`)
      throw new Error(err)
    }
  }

  handleNotificationWebhook (notificationRequestItems: NotificationRequestItem[]): void {
    notificationRequestItems.forEach((notificationItem) => {
      const { NotificationRequestItem }: any = notificationItem // Wrong typing in Adyen package
      if (NotificationRequestItem.eventCode === 'CANCEL_OR_REFUND') {
        if (this.validator.validateHMAC(NotificationRequestItem, this._config.hmacKey)) {
          const payment = findPayment(NotificationRequestItem.pspReference, this.paymentStore)

          if (NotificationRequestItem.success === 'true') {
            if (
              'modification.action' in NotificationRequestItem.additionalData &&
              NotificationRequestItem.additionalData['modification.action'] === 'refund'
            ) {
              payment.status = 'Refunded'
            } else {
              payment.status = 'Cancelled'
            }
          } else {
            payment.status = 'Refund failed'
          }
        } else {
          console.error('NotificationRequest with invalid HMAC key received')
        }
      } else {
        console.info('skipping non actionable webhook')
      }
    })
  }
}
