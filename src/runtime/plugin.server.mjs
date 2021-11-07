import { AdyenServerApi } from '~adyen'

const configuration = <%= JSON.stringify(options) %>;

export default function (context, inject) {
  const adyenClient = new AdyenServerApi(configuration);

  inject('adyenClient', adyenClient)
  context.app.adyenClient = adyenClient
}
