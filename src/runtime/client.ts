import { CreateCheckoutSessionResponse } from '@adyen/api-library/lib/src/typings/checkout/createCheckoutSessionResponse'
import { DetailsRequest } from '@adyen/api-library/lib/src/typings/checkout/detailsRequest'
import { PaymentMethodsResponse } from '@adyen/api-library/lib/src/typings/checkout/paymentMethodsResponse'
import { PaymentResponse } from '@adyen/api-library/lib/src/typings/checkout/paymentResponse'
import { AdyenCheckoutClient, Amount, LocalStore } from './api'

export const sendRequestToServer = async <RETURN_TYPE>(method: string, url: string, data?: any) => {
  const result: RETURN_TYPE = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : null
  }).then(res => res.json())
    .catch(error => ({ error }))

  return result
}

export class AdyenClientApi implements AdyenCheckoutClient {
  async createPaymentSession (amount: Amount): Promise<CreateCheckoutSessionResponse> {
    return await sendRequestToServer<CreateCheckoutSessionResponse>('POST', '/api/createPaymentSession', amount)
  }

  async getPaymentMethods (): Promise<PaymentMethodsResponse> {
    return await sendRequestToServer<PaymentMethodsResponse>('GET', '/api/getPaymentMethods')
  }

  async submitAdditionalDetails (paymentDetailsRequest: DetailsRequest): Promise<PaymentResponse> {
    return await sendRequestToServer<PaymentResponse>('POST', '/api/submitAdditionalDetails', paymentDetailsRequest)
  }

  async handleShopperRedirect (paymentDetailsRequest: DetailsRequest): Promise<void> {
    await sendRequestToServer<void>('GET', '/api/handleShopperRedirect', paymentDetailsRequest)
  }

  async initiatePayment (data: any): Promise<PaymentResponse> {
    return await sendRequestToServer<PaymentResponse>('POST', '/api/initiatePayment', data)
  }

  async getPaymentDataStore (): Promise<LocalStore> {
    return await sendRequestToServer<LocalStore>('GET', '/api/getPaymentDataStore')
  }
}
