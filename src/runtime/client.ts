import { Context } from "@nuxt/types";
import { AdyenCheckoutClient } from "./api";

export class AdyenClientApi implements AdyenCheckoutClient {
  private readonly _context: Context;

  constructor(context: Context) {
    this._context = context;
  }

  async createPaymentSession() {
    const result = await fetch('/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .catch(error => ({ error }))

    return result;
  }
}
