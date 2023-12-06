import { Modal } from "antd";
import React, { useState } from "react";
import StripePaymentForm from "../ui/StripePaymentForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { config } from "@/helpers/config/envConfig";

interface IPaymentModalProps {
  bookingId: string;
  setBookingId: (v: string) => void;
}

const stripePromise = loadStripe(config.stripe_publishable_key as string);

const PaymentModal = ({ bookingId, setBookingId }: IPaymentModalProps) => {
  return (
    <div>
      <Modal
        open={bookingId ? true : false}
        onCancel={() => setBookingId("")}
        footer={null}
      >
        <Elements stripe={stripePromise}>
          <StripePaymentForm
            bookingId={bookingId}
            setBookingId={setBookingId}
          />
        </Elements>
      </Modal>
    </div>
  );
};

export default PaymentModal;
