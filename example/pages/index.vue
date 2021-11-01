<template>
  <div>
    <adyen-checkout
      :amount="1000"
      :currency="'EUR'"
      :paymentMethodsResponse="paymentMethodsMock"
      :onSubmit="onSubmit"
      :onAdditionalDetails="onAdditionalDetails"
      @payment-submitted="logPaymentSubmittedData"
      @additional-details="logAdditionalDetails"
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
    onSubmit(state, dropin) {
      dropin.setStatus("loading");

      setTimeout(() => {
        dropin.setStatus("finished")
      }, 3000)
    },
    onAdditionalDetails(state, dropin) {
      console.log(state);
    }
  }
}
</script>
