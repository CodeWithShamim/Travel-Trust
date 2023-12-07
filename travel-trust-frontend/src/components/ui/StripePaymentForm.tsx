/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Form from "../forms/Form";
import { SubmitHandler } from "react-hook-form";
import { Button, Steps, message } from "antd";
import {
  useCreatePaymentIntentMutation,
  useUpdatePaymentMutation,
} from "@/redux/api/paymentApi";
import { PAYMENT_ROLE, USER_ROLE } from "@/constants/role";
import { useCallback, useState } from "react";
import { IPaymentModal } from "@/types";
import { StripeElementsStyles } from "@/constants/commons";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import ConfettiComponent from "./Confetti";

const StripePaymentForm = ({
  bookingData,
  setBookingData,
  setIsPaymentSuccess,
}: IPaymentModal & { setIsPaymentSuccess: (v: boolean) => void } & {}) => {
  const [handleCreatePaymentIntent, { data, isLoading }] =
    useCreatePaymentIntentMutation();

  const [handleUpdatePayment, { data: data2, isLoading: updateLoading }] =
    useUpdatePaymentMutation();

  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();
  const user: any = useAppSelector((state) => state.user?.data);

  const [isConfettiActive, setConfettiActive] = useState(false);

  const handleShowConfetti = useCallback(() => {
    // message.success("Congratulation! payment success");
    setConfettiActive(true);
    setIsPaymentSuccess(true);

    setTimeout(() => {
      setConfettiActive(false);
      router.push(
        user?.role === USER_ROLE.USER
          ? "/dashboard/user/bookings"
          : "/dashboard/admin/manage-bookings"
      );
      setBookingData(null);
    }, 5000);
  }, []);

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

      // >> step-1 <<
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement) as any,
      });

      if (error) {
        message.error(error.message);
        setLoading(false);
        return;
      } else {
        // >> step-2 <<
        const clientSecretRes: any = await handleCreatePaymentIntent({
          amount: String(bookingData?.service?.price),
          bookingId: bookingData?.id as string,
        });

        if (!clientSecretRes?.data?.clientSecret) {
          message.error("Client secret not found!");
          setLoading(false);
          return;
        }

        // >> step-3 <<
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
            // >> step-4 <<
            // update payment status
            const res: any = await handleUpdatePayment({
              id: clientSecretRes?.data?.id,
              paymentStatus: PAYMENT_ROLE.SUCCEEDED,
              paymentIntent: paymentIntent?.id,
            });

            const cardElement = elements.getElement(CardElement);
            cardElement?.clear();

            handleShowConfetti();
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
      {/* confetti  */}
      <div>
        <ConfettiComponent active={isConfettiActive} />
      </div>

      <div className="py-5">
        <h2 className="font-bold text-green-500">
          Payable Amount: ${bookingData?.service?.price}
        </h2>
      </div>

      <div className="custom-card-element w-full">
        <CardElement options={StripeElementsStyles} />
      </div>

      <div className="flex items-center justify-between gap-5 w-full">
        <Button
          onClick={() => setBookingData(null)}
          type="primary"
          className=" mt-4 w-full bg-red-500"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className=" mt-4 w-full"
          loading={loading || isLoading || updateLoading}
        >
          Pay Now
        </Button>
      </div>

      <p className="text-xs py-4">
        Payment secured by <span className="font-semibold text-xs">Stripe</span>
        . You’ll be taken to a thank you page after the payment.
        <span className="font-semibold  text-xs">Terms</span> and{" "}
        <span className="font-semibold  text-xs">Privacy</span>.
      </p>
    </Form>
  );
};

export default StripePaymentForm;
