<template>
  <div id="adyen-dropin" />
</template>

<script>
export default {
  name: 'AdyenCheckout',
  props: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    paymentMethodsResponse: {
      type: Object,
      required: true
    },
    paymentMethodsConfiguration: {
      type: Object,
      default: () => ({})
    },
    configuration: {
      type: Object,
      default: () => ({})
    },
    onSubmit: {
      type: Function,
      required: true
    },
    onAdditionalDetails: {
      type: Function,
      required: true
    },
    onError: {
      type: Function,
      required: true
    },
    onPaymentCompleted: {
      type: Function,
      required: true
    }
  },
  async mounted () {
    await this.initAdyenCheckout()
  },
  methods: {
    async initAdyenCheckout () {
      const { default: AdyenCheckout } = await import('@adyen/adyen-web')

      const configuration = {
        locale: this.$adyen.locale,
        environment: this.$adyen.environment,
        clientKey: this.$adyen.clientKey,
        paymentMethodsResponse: this.paymentMethodsResponse,
        paymentMethodsConfiguration: this.paymentMethodsConfiguration,
        amount: {
          value: this.amount,
          currency: this.currency
        },
        onSubmit: async (state, dropin) => {
          await this.onSubmit(state, dropin)
          this.$emit('payment-submitted', state)
        },
        onAdditionalDetails: async (state, dropin) => {
          await this.onAdditionalDetails(state, dropin)
          this.$emit('additional-details', state)
        },
        onError: async (state, dropin) => {
          await this.onError(state, dropin)
          this.$emit('payment-error', state)
        }
      }

      const checkoutConfiguration = Object.keys(this.configuration).length ? this.configuration : configuration

      const checkout = await new AdyenCheckout(checkoutConfiguration)

      checkout.create('dropin').mount('#adyen-dropin')
    }
  }
}
</script>

<style src="@adyen/adyen-web/dist/adyen.css"></style>
