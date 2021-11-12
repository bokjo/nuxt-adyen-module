import { AdyenClientApi } from '~adyen/client'

<% if (options.registerCheckoutComponent) { %>
  import Vue from 'vue'
  import AdyenCheckout from '~adyen/AdyenCheckout.vue'

  Vue.component('AdyenCheckout', AdyenCheckout);

<% } %>

export default function (context, inject) {
  const adyenClientAPI = new AdyenClientApi() ;

  inject('adyen', adyenClientAPI)
  context.app.adyen = adyenClientAPI
}
