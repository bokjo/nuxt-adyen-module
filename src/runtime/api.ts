export type AdyenCheckoutOptions = {
  locale: string;
  environment: string;
  clientKey: string;
};

export type AdyenClientOptions = {
  merchantAccount: string;
  returnUrl: string;
  checkoutEndpoint: string;
  apiKey: string;
  environment: Environment;
}

export type AdyenConfigOptions = {
  checkout: AdyenCheckoutOptions;
  client: AdyenClientOptions
}

export type Environment = "LIVE" | "TEST";

export interface AdyenCheckoutClient {
  createPaymentSession(): any
};
