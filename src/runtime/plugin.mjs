const configuration = <%= JSON.stringify(options) %>;

export default function (context, inject) {
  inject('adyen', configuration)
  context.app.adyen = configuration
}
