import { Button, Divider, Modal, Steps } from 'antd';
import React, { useState } from 'react';
import StripePaymentForm from '../ui/StripePaymentForm';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { config } from '@/helpers/config/envConfig';
import { IPaymentModal } from '@/types';
import Image from 'next/image';
import { LoadingOutlined, SmileOutlined, SolutionOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { PAYMENT_METHOD_ROLE } from '@/constants/role';
import CryptoPaymentForm from '../ui/CryptoPaymentForm';

const stripePromise = loadStripe(config.stripe_publishable_key as string);

const PaymentModal = ({ bookingData, setBookingData }: IPaymentModal) => {
  const [paymentMethod, setPaymentMethod] = useState<string>(PAYMENT_METHOD_ROLE.CRYPTO);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div>
      <Modal
        // open={bookingData?.id ? true : false}
        open={true}
        onCancel={() => setBookingData(null)}
        footer={null}
        className="lg:w-[60rem]"
      >
        <div className="lg:px-10">
          {/* stepper  */}
          <Steps
            items={[
              {
                title: 'Method',
                status: 'process',
                icon: <SolutionOutlined />,
              },
              {
                title: 'Pay',
                status: 'wait',
                icon: <LoadingOutlined />,
              },
              {
                title: 'Done',
                status: 'wait',
                icon: <SmileOutlined />,
              },
            ]}
            className="py-6 hidden md:flex"
          />

          {/* payment success message  */}
          {isPaymentSuccess && (
            <h1 className="text-[#FFD20A] text-bold text-center text-xl md:text-2xl lg:text-3xl">
              Congratulation! Payment successfully completed.
            </h1>
          )}

          {/* header content  */}
          <div className="!flex !items-center !justify-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold shadow-2xl uppercase text-[#FFD20A] z-50">
              Travel Trust
            </h1>
            {paymentMethod && (
              <Image
                width={20}
                height={20}
                className="!h-40 !w-40 object-cover rounded-full"
                src={require('@/assets/pay.png')}
                alt="Payment image"
                layout="responsive"
              />
            )}
          </div>

          {/* payment method  */}
          <div>
            <Divider orientation="center" className=" mb-8">
              <h2 className="font-semibold text-center">Select payment method</h2>
            </Divider>
            <div className="flex items-center justify-center gap-5 md:gap-8">
              {['crypto', 'stripe'].map((method: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setPaymentMethod(method)}
                  className={`${
                    paymentMethod === method ? 'bg-green-500' : 'bg-green-200'
                  } px-8 py-4 rounded md:w-[150px] text-center hover:bg-green-400 transition-all cursor-pointer`}
                >
                  <p className="uppercase font-medium text-black">{method}</p>
                </div>
              ))}
            </div>
          </div>

          {/* crypto form & feature */}
          {paymentMethod === PAYMENT_METHOD_ROLE.CRYPTO && (
            <Elements stripe={stripePromise}>
              <CryptoPaymentForm
                bookingData={bookingData}
                setBookingData={setBookingData}
                setIsPaymentSuccess={setIsPaymentSuccess}
              />
            </Elements>
          )}

          {/* stripe form & feature */}
          {paymentMethod === PAYMENT_METHOD_ROLE.STRIPE && (
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                bookingData={bookingData}
                setBookingData={setBookingData}
                setIsPaymentSuccess={setIsPaymentSuccess}
              />
            </Elements>
          )}

          <Button
            onClick={() => {
              setBookingData(null);
              // router.push('/dashboard/user/bookings');
            }}
            className="w-full my-5"
            type="primary"
            ghost
          >
            Skip
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentModal;
