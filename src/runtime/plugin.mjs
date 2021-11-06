const configuration = <%= JSON.stringify(options, null, 2) %>;

export default function (context, inject) {
  inject('adyen', configuration)
  context.app.adyen = configuration
}
