import { AdyenClientApi } from '~adyen/client'

export default function (context, inject) {
  const adyenClientAPI = new AdyenClientApi(context);

  inject('adyenClient', adyenClientAPI)
  context.app.adyenClient = adyenClientAPI
}
