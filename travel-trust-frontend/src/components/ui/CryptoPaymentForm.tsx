/* eslint-disable react-hooks/exhaustive-deps */
import Form from '../forms/Form';
import { SubmitHandler } from 'react-hook-form';
import { Button, Spin, Steps, message } from 'antd';
import { useCreatePaymentIntentMutation, useUpdatePaymentMutation } from '@/redux/api/paymentApi';
import { PAYMENT_ROLE, USER_ROLE } from '@/constants/role';
import { useCallback, useEffect, useState } from 'react';
import { IPaymentModal } from '@/types';
import { useAppSelector, useAppToast } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import ConfettiComponent from './Confetti';
import { getFheInstance } from '@/utils/fheInstance';
import TravelTrustABI from '@/abi/TravelTrust.json';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { SERVICE_OWNER, TravelTrustContract } from '@/lib/contracts';
import { simulateContract } from 'wagmi/actions';
import { config } from '@/lib/Wagmi';
import { hexlify, parseEther } from 'ethers';

const CryptoPaymentForm = ({
  bookingData,
  setBookingData,
  setIsPaymentSuccess,
}: IPaymentModal & { setIsPaymentSuccess: (v: boolean) => void } & {}) => {
  const [handleCreatePaymentIntent, { data, isLoading }] = useCreatePaymentIntentMutation();

  const [handleUpdatePayment, { data: data2, isLoading: updateLoading }] =
    useUpdatePaymentMutation();

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const user: any = useAppSelector((state) => state.user?.data);

  const [isConfettiActive, setConfettiActive] = useState(false);

  const { showToast } = useAppToast();
  const [encrypt, setEncrypt] = useState<null | string>(null);
  const { address } = useAccount();

  // write contract
  const { data: hash, writeContractAsync, isPending, error } = useWriteContract();
  const { data: payData, error: e2, isPending: pendingTx } = useWaitForTransactionReceipt({ hash });

  const handleShowConfetti = useCallback(() => {
    setConfettiActive(true);
    setIsPaymentSuccess(true);

    setTimeout(() => {
      setConfettiActive(false);
      //   router.push(
      //     user?.role === USER_ROLE.USER
      //       ? '/dashboard/user/bookings'
      //       : '/dashboard/admin/manage-bookings',
      //   );
      setBookingData(null);
    }, 5000);
  }, []);

  // show error & validation
  useEffect(() => {
    if (error?.message || e2?.message) {
      setEncrypt(null);
      showToast((error as any).message ?? e2?.message, 'error');
    }

    if (payData?.status) {
      setEncrypt(null);
      handleShowConfetti();
      showToast('Congratulation! payment success', 'success');
    }
  }, [error?.message, e2?.message, payData]);

  let fhe = getFheInstance();
  const contractAddress: any = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '0xTest';
  const ABI: any = TravelTrustABI.abi;

  const handlePaymentSubmit: SubmitHandler<any> = async (data: any, reset: any) => {
    try {
      //   setEncrypt('Encrypting rating...');

      //   if (!fhe) {
      //     fhe = await initializeFheInstance();
      //   }
      //   if (!fhe) {
      //     message.error('Failed to initialize FHE instance');
      //     return;
      //   }

      //   const ciphertext = await fhe.createEncryptedInput(contractAddress, address);

      //   ciphertext.add8(BigInt(20));
      //   const { handles, inputProof } = await ciphertext.encrypt();

      //   const encryptedRating = hexlify(handles[0]);
      //   const proofHex = hexlify(inputProof);

      setEncrypt('Waiting for tx confirmation...');

      //   const serviceId = '1a9c3f17-4d14-4ab8-8c24-1b9c5efb8a01';

      const txData: any = {
        ...TravelTrustContract,
        functionName: 'servicePayment',
        args: [SERVICE_OWNER as `0x${string}`, bookingData?.serviceId],
        chainId: 11155111,
        value: parseEther('0.02'),
      };

      await simulateContract(config, txData);

      await writeContractAsync(txData);

      setEncrypt('Checking status...');
    } catch (error: any) {
      showToast(error.message, 'error');
      setEncrypt(null);
    }
  };

  return (
    <div>
      <Form submitHandler={handlePaymentSubmit}>
        {/* confetti  */}
        <div className="w-full">
          <ConfettiComponent active={isConfettiActive} />
        </div>

        <div className="py-5">
          <h2 className="font-bold text-green-500">
            {/* Payable Amount: ${bookingData?.service?.price} */}
            {/* ------  */}
            {/* just for demon  */}
            Payable Amount: 0.02 ETH
          </h2>
        </div>

        <div>
          <p className="text-red-500">
            {encrypt && (
              <>
                <Spin></Spin> {encrypt}
              </>
            )}
          </p>
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
            loading={loading || isLoading || updateLoading || encrypt ? true : false}
          >
            Pay Now
          </Button>
        </div>

        <p className="text-xs py-4">
          Payment secured by{' '}
          <span className="font-semibold text-xs !text-amber-500">Zama FHE Protocol</span>. You’ll
          be taken to a thank you page after the payment.
          <span className="font-semibold  text-xs !text-amber-500">Terms</span> and{' '}
          <span className="font-semibold  text-xs !text-amber-500">Privacy</span>.
        </p>
      </Form>
    </div>
  );
};

export default CryptoPaymentForm;
