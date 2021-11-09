import { CheckoutAPI, Client } from "@adyen/api-library";
import { DetailsRequest } from "@adyen/api-library/lib/src/typings/checkout/detailsRequest";
import { PaymentResponse } from "@adyen/api-library/lib/src/typings/checkout/paymentResponse";
import { CreateCheckoutSessionResponse } from "@adyen/api-library/lib/src/typings/checkout/createCheckoutSessionResponse";
import { PaymentMethodsResponse } from "@adyen/api-library/lib/src/typings/checkout/paymentMethodsResponse";
import { AdyenCheckoutServer, AdyenConfigOptions, Amount, InitiatePaymentBody } from "./api";
import { createBillingAddress, createCountryCode, createPaymentMethod, createUniqueReference, findCurrency } from "./utils";

export class AdyenServerApi implements AdyenCheckoutServer {
  private readonly checkout: CheckoutAPI;
  private _config: AdyenConfigOptions;

  constructor(config: AdyenConfigOptions) {
    this._config = config;

    const client = new Client(config);

    this.checkout = new CheckoutAPI(client);
  }

  async createPaymentSession(amount: Amount): Promise<CreateCheckoutSessionResponse> {
    try {
      const response = await this.checkout.sessions({
        merchantAccount: this._config.merchantAccount,
        amount: {
          currency: amount.currency,
          value: amount.value
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

  async getPaymentMethods(): Promise<PaymentMethodsResponse> {
    try {
      const response = await this.checkout.paymentMethods({
        channel: this._config.channel as any,  // Cannot find the proper type due to Adyen namespace
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

  // eslint-disable-next-line
  async initiatePayment(req: any): Promise<PaymentResponse> {
    try {
      const shopperIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const initiatePaymentBody: InitiatePaymentBody = req.body;
      const currency = findCurrency(initiatePaymentBody);
      const orderRef = createUniqueReference();

      const response = await this.checkout.payments({
        amount: { currency, value: initiatePaymentBody.amount.value },
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
        lineItems: initiatePaymentBody.lineItems,
      });
      return response;
    } catch (err: any) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
      throw new Error(err);
    }
  }
}
