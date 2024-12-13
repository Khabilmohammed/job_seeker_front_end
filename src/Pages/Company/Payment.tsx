import React from 'react'
import { useLocation } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function Payment() {
  const {
    state:{paymentResponse,
    formData,}
  } = useLocation()
  console.log("Form Data:", formData);
  console.log("Payment Info:", paymentResponse);
  console.log("Payment secret:", paymentResponse.clientSecret);
  const stripePromise = loadStripe('pk_test_51O3ZKNSEPzFvRDL638Gz1pmCKLkAH0mUZhMoZlFK2nWggPV7hWxxtRNaSHEGJIhrkmrgEl07EdOHj1kC3FzPqL8Y00bJSUxe2m');
  const options = {
    clientSecret: paymentResponse.clientSecret
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="space-y-4">
        <PaymentForm  formData={formData} />
      </div>
    </Elements>
  )
}

export default Payment