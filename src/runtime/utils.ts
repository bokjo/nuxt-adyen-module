const { v4: uuid } = require("uuid");

export const findCurrency = (type: string) => {
  switch (type) {
    case "ach":
      return "USD";
    case "wechatpayqr":
    case "alipay":
      return "CNY";
    case "dotpay":
      return "PLN";
    case "boletobancario":
    case "boletobancario_santander":
      return "BRL";
    default:
      return "EUR";
  }
}

// eslint-disable-next-line
export const redirectByCode = (res: any, code: any) => {
  switch (code) {
    case "Authorised":
      res.redirect("/result/success");
      break;
    case "Pending":
    case "Received":
      res.redirect("/result/pending");
      break;
    case "Refused":
      res.redirect("/result/failed");
      break;
    default:
      res.redirect("/result/error");
      break;
  }
}

export const createUniqueReference = () => uuid()
