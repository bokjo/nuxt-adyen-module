import { CreateCheckoutSessionResponse } from "@adyen/api-library/lib/src/typings/checkout/createCheckoutSessionResponse";
import { DetailsRequest } from "@adyen/api-library/lib/src/typings/checkout/detailsRequest";
import { PaymentMethodsResponse } from "@adyen/api-library/lib/src/typings/checkout/paymentMethodsResponse";
import { AdyenCheckoutClient, Amount } from "./api";
import { sendRequestToServer } from "./utils";
import { PaymentResponse } from "@adyen/api-library/lib/src/typings/checkout/paymentResponse";

export class AdyenClientApi implements AdyenCheckoutClient {
  async createPaymentSession(amount: Amount): Promise<CreateCheckoutSessionResponse> {
    return sendRequestToServer<CreateCheckoutSessionResponse>('POST', '/api/createPaymentSession', amount);
  }

  async getPaymentMethods(): Promise<PaymentMethodsResponse> {
    return sendRequestToServer<PaymentMethodsResponse>('GET', '/api/getPaymentMethods');
  }

  async submitAdditionalDetails(paymentDetailsRequest: DetailsRequest): Promise<PaymentResponse> {
    return sendRequestToServer<PaymentResponse>('POST', '/api/submitAdditionalDetails', paymentDetailsRequest);
  }

  async handleShopperRedirect(paymentDetailsRequest: DetailsRequest): Promise<void> {
    sendRequestToServer<void>('POST', '/api/handleShopperRedirect', paymentDetailsRequest);
  }

  async initiatePayment() {
    const result = await fetch('/api/initiatePayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .catch(error => ({ error }))

    return result;
  }
}
