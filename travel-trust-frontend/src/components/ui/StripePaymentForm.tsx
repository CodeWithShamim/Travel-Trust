import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Form from "../forms/Form";
import { SubmitHandler } from "react-hook-form";
import FormInput from "../forms/FormInput";
import { Button, message } from "antd";
import {
  useCreatePaymentIntentMutation,
  useUpdatePaymentMutation,
} from "@/redux/api/paymentApi";
import { PAYMENT_ROLE } from "@/constants/role";
import { useState } from "react";

const StripePaymentForm = ({
  bookingId,
  setBookingId,
}: {
  bookingId: string;
  setBookingId: (v: string) => void;
}) => {
  const [handleCreatePaymentIntent, { data, isLoading }] =
    useCreatePaymentIntentMutation();

  const [handleUpdatePayment, { data: data2, isLoading: updateLoading }] =
    useUpdatePaymentMutation();

  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit: SubmitHandler<any> = async (
    data: any,
    reset: any
  ) => {
    if (!stripe || !elements) {
      message.error("Stripe or Elements is not yet loaded.");
      return;
    }

    try {
      setLoading(true);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement) as any,
      });

      if (error) {
        message.error(error.message);
        setLoading(false);
        return;
      } else {
        const clientSecretRes: any = await handleCreatePaymentIntent({
          amount: data?.amount,
          bookingId,
        });

        if (!clientSecretRes?.data?.clientSecret) {
          message.error("Client secret not found!");
          setLoading(false);
          return;
        }

        const { paymentIntent, error } = await stripe.confirmCardPayment(
          clientSecretRes?.data?.clientSecret,
          {
            payment_method: paymentMethod?.id as string,
          }
        );

        if (error) {
          message.error(error.message);
          setLoading(false);
        } else {
          if (paymentIntent?.id) {
            // update payment status
            const res: any = await handleUpdatePayment({
              id: clientSecretRes?.data?.id,
              paymentStatus: PAYMENT_ROLE.SUCCEEDED,
              paymentIntent: paymentIntent?.id,
            });

            if (res?.error) {
              message.success(res?.error?.data?.message);
              setLoading(false);
              return;
            }

            if (res?.data?.id) {
              setBookingId("");
              message.success("Congratulation! payment success");
            }
          }

          setLoading(false);
          reset();
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error handling payment:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form submitHandler={handlePaymentSubmit}>
      <CardElement />

      <div className="mt-4">
        <FormInput name="amount" type="number" size="large" label="Amount" />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className=" mt-4 w-full"
        loading={loading || isLoading || updateLoading}
      >
        Pay
      </Button>
    </Form>
  );
};

export default StripePaymentForm;
