<template>
  <div>
    <adyen-checkout
      :amount="priceMock.amount"
      :currency="priceMock.currency"
      :payment-methods-response="paymentMethodsMock"
      :on-submit="onSubmit"
      :on-error="onError"
      :on-additional-details="onAdditionalDetails"
      :on-payment-completed="onPaymentCompleted"
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
  computed: {
    paymentMethodsMock () {
      return paymentMethodsMock
    },
    priceMock () {
      return priceMock
    }
  },
  async fetch({ $adyenClient }) {
    if (process.server) {
      const result = await $adyenClient.createPaymentSession();

      console.log(result);
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
    }
  }
}
</script>
