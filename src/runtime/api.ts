import { BrowserInfo } from '@adyen/adyen-web/dist/types/types'
import { Address } from '@adyen/api-library/lib/src/typings/checkout/address'
import { CreateCheckoutSessionResponse } from '@adyen/api-library/lib/src/typings/checkout/createCheckoutSessionResponse'
import { DetailsRequest } from '@adyen/api-library/lib/src/typings/checkout/detailsRequest'
import { LineItem } from '@adyen/api-library/lib/src/typings/checkout/lineItem'
import { Name } from '@adyen/api-library/lib/src/typings/checkout/name'
import { PaymentMethod } from '@adyen/api-library/lib/src/typings/checkout/paymentMethod'
import { PaymentMethodsResponse } from '@adyen/api-library/lib/src/typings/checkout/paymentMethodsResponse'
import { PaymentResponse } from '@adyen/api-library/lib/src/typings/checkout/paymentResponse'
import { RiskData } from '@adyen/api-library/lib/src/typings/checkout/riskData'
import { NotificationRequestItem } from '@adyen/api-library/lib/src/typings/notification/notificationRequestItem'

export enum ChannelEnum {
  IOs,
  Android,
  Web
}

export type Environment = 'LIVE' | 'TEST';

export type Amount = {
  currency: string;
  value: number;
};

export type LocalStore = {
  [key: string]: any;
};

export type AdyenConfigOptions = {
  merchantAccount: string;
  returnUrl: string;
  origin: string;
  checkoutEndpoint: string;
  apiKey: string;
  clientKey: string;
  environment: Environment;
  channel: ChannelEnum;
  hmacKey: string;
  registerCheckoutComponent?: boolean;
};

export type InitiatePaymentBody = {
  riskData: RiskData;
  origin: string;
  clientStateDataIndicator: boolean;
  lineItems?: LineItem [];
  shopper?: {
    email?: string;
    locale?: string;
    name?: Name;
  };
  socialSecurityNumber?: string;
  paymentMethod: PaymentMethod;
  amount: Amount;
  billingAddress: Address;
  browserInfo: BrowserInfo;
};

interface AdyenCheckout {
  createPaymentSession(amount: Amount): Promise<CreateCheckoutSessionResponse>;
  getPaymentMethods(): Promise<PaymentMethodsResponse>;
  initiatePayment(req: Request): Promise<PaymentResponse>;
}

export interface AdyenCheckoutClient extends AdyenCheckout {
  submitAdditionalDetails(paymentDetailsRequest: DetailsRequest): Promise<PaymentResponse>;
  handleShopperRedirect(paymentDetailsRequest: DetailsRequest): Promise<void>;
};

export interface AdyenCheckoutServer extends AdyenCheckout {
  getPaymentsDetails(paymentDetailsRequest: DetailsRequest, orderRef: string): Promise<PaymentResponse>;
  handleNotificationWebhook(notificationRequestItems: NotificationRequestItem[]): void;
};
