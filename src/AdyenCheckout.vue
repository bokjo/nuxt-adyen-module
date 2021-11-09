<template>
  <div id="adyen-dropin" />
</template>

<script>
export default {
  name: 'AdyenCheckout',
  props: {
    value: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    locale: {
      type: String,
      default: ''
    },
    translations: {
      type: Object,
      default: () => ({})
    },
    implementedPaymentMethods: {
      type: Array,
      default: () => ([])
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
    },
    onAdditionalDetails: {
      type: Function,
    },
    onError: {
      type: Function,
    },
    onPaymentCompleted: {
      type: Function,
    },
    handleRedirectAfterPayment: {
      type: Function,
    }
  },
  async mounted () {
    await this.initAdyenCheckout()
  },
  methods: {
    async initAdyenCheckout () {
      try {
        const { locale, translations, paymentMethodsConfiguration, value, currency } = this;

        const { default: AdyenCheckout } = await import('@adyen/adyen-web')
        const { result: paymentMethodsResponse, clientKey, environment  } = await this.$adyen.getPaymentMethods();
        const session = await this.$adyen.createPaymentSession({ currency, value });

        const configuration = {
          locale,
          translations,
          environment,
          clientKey,
          paymentMethodsResponse: this.filterUnimplemented(paymentMethodsResponse),
          session,
          paymentMethodsConfiguration,
          onSubmit: async (state, dropin) => {
            if (this.onSubmit) {
              await this.onSubmit(state, dropin)
            } else {
              if (state.isValid) {
                const result = await this.$adyen.initiatePayment(state.data);
                this.handleServerResponse(result, dropin);
              }
            }
            this.$emit('payment-submitted', state)
          },
          onAdditionalDetails: async (state, dropin) => {
            if (this.onAdditionalDetails) {
              await this.onAdditionalDetails(state, dropin)
            } else {
              const result = await this.$adyen.submitAdditionalDetails(state.data);
              this.handleServerResponse(result, dropin);
            }
            this.$emit('additional-details', state)
          },
          onError: async (state, dropin) => {
            if (this.onError) {
              await this.onError(state, dropin)
            }
            this.$emit('payment-error', state)
          },
          onPaymentCompleted: async (state, dropin) => {
            if (this.onPaymentCompleted) {
              await this.onPaymentCompleted(state, dropin)
            }
            this.$emit('payment-completed', state);
          }
        }

        const checkoutConfiguration = Object.keys(this.configuration).length ? this.configuration : configuration

        const checkout = await new AdyenCheckout(checkoutConfiguration)

        checkout.create('dropin').mount('#adyen-dropin')
      } catch (error) {
        console.error(error);
      }
    },
    handleServerResponse(res, component) {
      if (res.action) {
        component.handleAction(res.action);
      } else {
        if (this.handleRedirectAfterPayment) {
          this.handleRedirectAfterPayment(res.resultCode);
        } else {
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
    },
    filterUnimplemented(pm) {
      if (this.implementedPaymentMethods.length) {
        pm.paymentMethods = pm.paymentMethods.filter((it) => this.implementedPaymentMethods.includes(it.type));
      }

      return pm;
    }
  }
}
</script>

<style src="@adyen/adyen-web/dist/adyen.css"></style>
