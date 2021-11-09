<template>
  <div>
    <adyen-checkout
      :value="priceMock.amount"
      :currency="priceMock.currency"
      :locale="locale"
      :implementedPaymentMethods="implementedPaymentMethods"
      :on-additional-details="onAdditionalDetails"
      :on-payment-completed="onPaymentCompleted"
      :handle-redirect-after-payment="handleRedirectAfterPayment"
      @payment-submitted="logPaymentSubmittedData"
      @additional-details="logAdditionalDetails"
      @payment-error="logError"
    />
  </div>
</template>

<script>
import AdyenCheckout from '../../src/AdyenCheckout.vue'
import paymentMethodsMock from '../mocks/paymentMethodsMock.json'
import { priceMock } from '../mocks/priceMock'

export default {
  components: {
    AdyenCheckout
  },
  data() {
    return {
      implementedPaymentMethods:
      [
        "scheme",
        "ideal",
        "dotpay",
        "giropay",
        "sepadirectdebit",
        "directEbanking",
        "ach",
        "alipay",
        "klarna_paynow",
        "klarna",
        "klarna_account",
        "boletobancario_santander",
      ],
      locale: 'en_US'
    }
  },
  computed: {
    paymentMethodsMock () {
      return paymentMethodsMock
    },
    priceMock () {
      return priceMock
    }
  },
  methods: {
    logPaymentSubmittedData (e) {
      // eslint-disable-next-line no-console
      console.log('logPaymentSubmittedData', e)
    },
    logAdditionalDetails (e) {
      // eslint-disable-next-line no-console
      console.log('logAdditionalDetails', e)
    },
    logError (e) {
      // eslint-disable-next-line no-console
      console.log('logError', e)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit (state, dropin) {
      dropin.setStatus('loading')

      setTimeout(() => {
        dropin.setStatus('finished')
      }, 3000)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onAdditionalDetails (state, dropin) {
      // eslint-disable-next-line no-console
      console.log(state)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError (state, dropin) {
      // eslint-disable-next-line no-console
      console.log(state)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPaymentCompleted (state, dropin) {
      // eslint-disable-next-line no-console
      console.log(state)
    },
    handleRedirectAfterPayment(resultCode) {
      switch (resultCode) {
        case "Authorised":
          window.location.href = "/result/success";
          break;
        case "Pending":
        case "Received":
          window.location.href = "/result/pending";
          break;
        case "Refused":
          window.location.href = "/result/failed";
          break;
        default:
          window.location.href = "/result/error";
          break;
      }
    }
  }
}
</script>
