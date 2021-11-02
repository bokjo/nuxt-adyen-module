<template>
  <div id="adyen-dropin"></div>
</template>

<script>
export default {
  name: "AdyenCheckout",
  props: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentMethodsResponse: {
      type: Object,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    onAdditionalDetails: {
      type: Function,
      required: true,
    }
  },
  methods: {
    async initAdyenCheckout() {
      const { default: AdyenCheckout } = await import('@adyen/adyen-web');

      const configuration = {
        locale: this.$adyen.locale,
        environment: this.$adyen.environment,
        clientKey: this.$adyen.clientKey,
        paymentMethodsResponse: this.paymentMethodsResponse,
        amount: {
          value: this.amount,
          currency: this.currency
        },
        onSubmit: async (state, dropin) => {
          await this.onSubmit(state, dropin)
          this.$emit('payment-submitted', state);
        },
        onAdditionalDetails: async (state, dropin) => {
          await this.onAdditionalDetails(state, dropin)
          this.$emit('additional-details', state);
        }
      };

      const checkout = await new AdyenCheckout(configuration);

      checkout.create("dropin").mount("#adyen-dropin");
    }
  },
  async mounted() {
    await this.initAdyenCheckout();
  }
};
</script>

<style src="@adyen/adyen-web/dist/adyen.css"></style>
