<template>
  <div>
    <adyen-checkout
      :amount="mockedPrice.amount"
      :currency="mockedPrice.currency"
      :paymentMethodsResponse="paymentMethodsMock"
      :onSubmit="onSubmit"
      :onError="onError"
      :onAdditionalDetails="onAdditionalDetails"
      @payment-submitted="logPaymentSubmittedData"
      @additional-details="logAdditionalDetails"
      @payment-error="logError"
    />
  </div>
</template>

<script>
import AdyenCheckout from '../components/AdyenCheckout.vue';
import paymentMethodsMock from "../paymentMethodsMock.json";
export default {
  components: {
    AdyenCheckout
  },
  data() {
    return {
      mockedPrice: {
        amount: 1000,
        currency: 'EUR',
      }
    }
  },
  computed: {
    paymentMethodsMock() {
      return paymentMethodsMock;
    }
  },
  methods: {
    logPaymentSubmittedData(e) {
      console.log('logPaymentSubmittedData', e)
    },
    logAdditionalDetails(e) {
      console.log('logAdditionalDetails', e)
    },
    logError(e) {
      console.log('logError', e)
    },
    onSubmit(state, dropin) {
      dropin.setStatus("loading");

      setTimeout(() => {
        dropin.setStatus("finished")
      }, 3000)
    },
    onAdditionalDetails(state, dropin) {
      console.log(state);
    },
    onError(state, dropin) {
      console.log(state);
    }
  }
}
</script>
