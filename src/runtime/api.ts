import { CreateCheckoutSessionResponse } from "@adyen/api-library/lib/src/typings/checkout/createCheckoutSessionResponse";
import { DetailsRequest } from "@adyen/api-library/lib/src/typings/checkout/detailsRequest";
import { LineItem } from "@adyen/api-library/lib/src/typings/checkout/lineItem";
import { Name } from "@adyen/api-library/lib/src/typings/checkout/name";
import { PaymentMethod } from "@adyen/api-library/lib/src/typings/checkout/paymentMethod";
import { PaymentMethodsResponse } from "@adyen/api-library/lib/src/typings/checkout/paymentMethodsResponse";
import { PaymentResponse } from "@adyen/api-library/lib/src/typings/checkout/paymentResponse";

export type AdyenCheckoutOptions = {
  locale: string;
  environment: string;
  clientKey: string;
};

export type AdyenClientOptions = {
  merchantAccount: string;
  returnUrl: string;
  origin: string;
  locale: string;
  checkoutEndpoint: string;
  apiKey: string;
  clientKey: string;
  environment: Environment;
}

export type AdyenConfigOptions = {
  checkout: AdyenCheckoutOptions;
  client: AdyenClientOptions
}

export type Environment = "LIVE" | "TEST";

export type InitiatePaymentBody = {
  lineItems?: LineItem [];
  shopper?: {
    email?: string;
    locale?: string;
    name?: Name;
  };
  socialSecurityNumber?: string;
  paymentMethod: PaymentMethod;
  amount: {
    currency?: string;
    value: number;
  }
};

export interface AdyenCheckoutClient {
  createPaymentSession(): Promise<CreateCheckoutSessionResponse>;
  getPaymentMethods(): Promise<PaymentMethodsResponse>;
  initiatePayment(req: Request): Promise<PaymentResponse>;
  getPaymentsDetails?(paymentDetailsRequest: DetailsRequest): Promise<PaymentResponse>;
};
