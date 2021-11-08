import { AdyenCheckoutClient, AdyenClientOptions, InitiatePaymentBody } from "./api";
import { CheckoutAPI, Client } from "@adyen/api-library";
import { DetailsRequest } from "@adyen/api-library/lib/src/typings/checkout/detailsRequest";
import { PaymentResponse } from "@adyen/api-library/lib/src/typings/checkout/paymentResponse";
import { createUniqueReference, findCurrency } from "./utils";

export class AdyenServerApi implements AdyenCheckoutClient {
  private readonly checkout: CheckoutAPI;
  private _config: AdyenClientOptions;

  constructor(config: AdyenClientOptions) {
    this._config = config;

    const client = new Client(config);

    this.checkout = new CheckoutAPI(client);
  }

  async createPaymentSession() {
    try {
      const response = await this.checkout.sessions({
        merchantAccount: this._config.merchantAccount,
        amount: {
          currency: "EUR",
          value: 1000
        },
        reference: createUniqueReference(),
        returnUrl: this._config.returnUrl
      })

      return response;
    } catch (err: any) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
      throw new Error(err);
    }
  }

  async getPaymentMethods() {
    try {
      const response = await this.checkout.paymentMethods({
        channel: "Web",
        merchantAccount: this._config.merchantAccount
      });

      return response;
    } catch (err: any) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
      throw new Error(err);
    }
  }

  async getPaymentsDetails(paymentDetailsRequest: DetailsRequest) {
    try {
      const response = await this.checkout.paymentsDetails(paymentDetailsRequest);

      return response;
    } catch (err: any) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
      throw new Error(err);
    }
  }

  async initiatePayment(req: any): Promise<PaymentResponse> {
    try {
      const currency = findCurrency(req.body.paymentMethod.type);
      const shopperIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const { body } = req;
      const initiatePaymentBody: InitiatePaymentBody = req.body;
      const orderRef = createUniqueReference();
      const shopperReference = createUniqueReference();

      const response = await this.checkout.payments({
        amount: { currency, value: initiatePaymentBody.amount.value },
        reference: orderRef, // required
        merchantAccount: this._config.merchantAccount,
        channel: "Web",
        additionalData: {
          allow3DS2: true as any // Wrong Adyen typing. Each property of additionalData has to be string, while some properties require boolean values.
        },
        origin: this._config.origin, // required for 3ds2 native flow
        browserInfo: body.browserInfo, // required for 3ds2
        shopperIP, // required by some issuers for 3ds2
        returnUrl: `http://localhost:8080/api/handleShopperRedirect?orderRef=${orderRef}`, // required for 3ds2 redirect flow
        // special handling for boleto
        paymentMethod: initiatePaymentBody.paymentMethod.type.includes("boleto")
          ? {
              type: "boletobancario_santander"
            }
          :body.paymentMethod,
        // Below fields are required for Boleto:
        socialSecurityNumber: initiatePaymentBody.socialSecurityNumber,
        shopperName: initiatePaymentBody.shopper?.name,
        billingAddress:
          typeof body.billingAddress === "undefined" ||
          Object.keys(body.billingAddress).length === 0
            ? null
            : body.billingAddress,
        deliveryDate: new Date(),
        shopperStatement: "Test Statement",
        // Below fields are required for Klarna:
        countryCode: body.paymentMethod.type.includes("klarna") ? "DE" : undefined,
        shopperReference,
        shopperEmail: "youremail@email.com",
        shopperLocale: this._config.locale,
        lineItems: initiatePaymentBody.lineItems,
      });
      return response;
    } catch (err: any) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
      throw new Error(err);
    }
  }
}
