import { AdyenServerApi } from '~adyen'

const configuration = <%= JSON.stringify(options) %>;

export default function (context, inject) {
  const adyenClientAPI = new AdyenServerApi(configuration);

  inject('adyenClientAPI', adyenClientAPI)
  context.app.adyenClientAPI = adyenClientAPI
}
