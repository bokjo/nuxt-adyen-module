import { AdyenClientApi } from '~adyen/client'

export default function (context, inject) {
  const adyenClientAPI = new AdyenClientApi();

  inject('adyen', adyenClientAPI)
  context.app.adyen = adyenClientAPI
}
