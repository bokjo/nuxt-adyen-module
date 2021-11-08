import { Context } from "@nuxt/types";
import { AdyenCheckoutClient } from "./api";

export class AdyenClientApi implements AdyenCheckoutClient {
  private readonly _context: Context;

  constructor(context: Context) {
    this._context = context;
  }

  async createPaymentSession() {
    const result = await fetch('/api/createPaymentSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .catch(error => ({ error }))

    return result;
  }

  async getPaymentMethods() {
    const result = await fetch('/api/getPaymentMethods', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .catch(error => ({ error }))

    return result;
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

  async submitAdditionalDetails() {
    const result = await fetch('/api/submitAdditionalDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .catch(error => ({ error }))

    return result;
  }

  async handleShopperRedirect() {
    const result = await fetch('/api/handleShopperRedirect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .catch(error => ({ error }))

    return result;
  }
}
