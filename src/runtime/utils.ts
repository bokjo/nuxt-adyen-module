import { InitiatePaymentBody, LocalStore } from './api'

const { v4: uuid } = require('uuid')

export const createUniqueReference = () => uuid()

export const findCurrency = (initiatePaymentBody: InitiatePaymentBody) => {
  const type = initiatePaymentBody?.paymentMethod?.type
  switch (type) {
    case 'ach':
      return 'USD'
    case 'wechatpayqr':
    case 'alipay':
      return 'CNY'
    case 'dotpay':
      return 'PLN'
    case 'boletobancario':
    case 'boletobancario_santander':
      return 'BRL'
    default:
      return 'EUR'
  }
}

export const findPayment = (pspReference: string, paymentStore: LocalStore) => {
  const payments = Object.values(paymentStore).filter((v) => v.modificationRef === pspReference);
  if (payments.length > 0) {
    console.error("More than one payment found with same modification PSP reference");
  }
  return payments[0];
}

// eslint-disable-next-line
export const redirectByCode = (res: any, code: any) => {
  switch (code) {
    case 'Authorised':
      res.redirect('/result/success')
      break
    case 'Pending':
    case 'Received':
      res.redirect('/result/pending')
      break
    case 'Refused':
      res.redirect('/result/failed')
      break
    default:
      res.redirect('/result/error')
      break
  }
}

export const sendRequestToServer = async <RETURN_TYPE>(method: string, url: string, data?: any) => {
  const result: RETURN_TYPE = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : null
  }).then(res => res.json())
    .catch(error => ({ error }))

  return result
}

export const createPaymentMethod = (initiatePaymentBody: InitiatePaymentBody) => {
  const isMethodBoleto = initiatePaymentBody?.paymentMethod?.type?.includes('boleto')

  // special handling for boleto
  return isMethodBoleto ? { type: 'boletobancario_santander' } : initiatePaymentBody?.paymentMethod
}

export const createBillingAddress = (initiatePaymentBody: InitiatePaymentBody) => {
  const isBillingUndefined = typeof initiatePaymentBody?.billingAddress === 'undefined'
  const isBillingEmpty = !isBillingUndefined ? Object.keys(initiatePaymentBody?.billingAddress).length === 0 : undefined

  return isBillingUndefined || isBillingEmpty ? undefined : initiatePaymentBody?.billingAddress
}

export const createCountryCode = (initiatePaymentBody: InitiatePaymentBody) => {
  const isMethodKlarna = initiatePaymentBody?.paymentMethod?.type?.includes('klarna')

  return isMethodKlarna ? 'DE' : undefined
}
