---
title: Checkout Component
description: "Props, events, and functionality of AdyenCheckout component"
position: 5
category: Guide
---

`AdyenCheckout.vue` component provides checkout functionality and card component by default but it also allows for advanced customizability and control over the payment process using following:

## Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Required</th>
      <th>Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>amount</td>
      <td>Number</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>currency</td>
      <td>String</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>paymentMethodsResponse</td>
      <td>Object</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>configuration</td>
      <td>Object</td>
      <td>-</td>
      <td>{}</td>
    </tr>
    <tr>
      <td>onSubmit</td>
      <td>Function</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>onAdditionalDetails</td>
      <td>Function</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>onError</td>
      <td>Function</td>
      <td>true</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

## Events

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Payload</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>payment-submitted</td>
      <td>state</td>
    </tr>
    <tr>
      <td>additional-details</td>
      <td>state</td>
    </tr>
    <tr>
      <td>payment-error</td>
      <td>state</td>
    </tr>
  </tbody>
</table>
