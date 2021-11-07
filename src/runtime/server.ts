import { AdyenCheckoutClient, AdyenClientOptions } from "./api";
import { CheckoutAPI, Client } from "@adyen/api-library";

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
      const response = this.checkout.sessions({
        merchantAccount: this._config.merchantAccount,
        amount: {
          currency: "EUR",
          value: 1000
        },
        reference: 'reference',
        returnUrl: this._config.returnUrl
      })

      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
