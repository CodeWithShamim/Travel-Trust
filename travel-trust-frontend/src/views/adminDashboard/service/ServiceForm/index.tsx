'use client';

import React, { useEffect, useState } from 'react';
import { Form, Button, message, Spin } from 'antd';

import { useParams, useRouter } from 'next/navigation';
import GeneralField from './GeneralField';
import {
  useCreateServiceMutation,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from '@/redux/api/serviceApi';
import { IService } from '@/types';
import Loader from '@/components/ui/Loader';
import { hexlify, parseEther } from 'ethers';
import { getFheInstance, initializeFheInstance } from '@/utils/fheInstance';
import TravelTrustABI from '@/abi/TravelTrust.json';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useAppToast } from '@/redux/hooks';
import { simulateContract } from 'wagmi/actions';
import { config } from '@/lib/Wagmi';
import { serviceItems } from '@/data/common';
import { SERVICE_FEE } from '@/lib/contracts';

const ADD = 'ADD';
const EDIT = 'EDIT';

const ServiceForm = ({ mode = ADD }: { mode?: 'ADD' | 'EDIT' }) => {
  const router = useRouter();
  const params = useParams();
  // const id = params?.id;

  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');

  const [handleCreateService, { isLoading }] = useCreateServiceMutation();
  const [handleUpdateService, { isLoading: updateLoading }] = useUpdateServiceMutation();

  // const { data: service, isLoading: isLoading2, error } = useGetSingleServiceQuery(id as string);

  // const { id } = params;
  const id = '';
  const service: any = serviceItems.find((service) => service?.id === id);

  const { showToast } = useAppToast();

  // onchain ----
  const { address, isConnected } = useAccount();
  let fhe = getFheInstance();
  const contractAddress: any = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '0xTest';
  const ABI: any = TravelTrustABI.abi;

  const [encrypt, setEncrypt] = useState<string>('');

  const { data: hash, writeContractAsync, isPending } = useWriteContract();
  const { data, error: e2, isPending: pendingTx } = useWaitForTransactionReceipt({ hash });

  // read contract
  const {
    data: serviceRe,
    error: serviceGetError,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: 'getService',
    args: [address as string, service?.id],
  });
  console.log('service result:', serviceRe);

  // show error & validation
  useEffect(() => {
    if (e2?.message) {
      showToast(e2?.message, 'error');
    }

    if (data?.status) {
      setEncrypt('');
      refetch();
      showToast('Successfully created service', 'success');
    }
  }, [e2, data]);

  useEffect(() => {
    if (mode === EDIT) {
      form.setFieldsValue(service);
    }
  }, [form, mode, service]);

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        // if (!imageUrl && mode === ADD) {
        //   showToast('Image is required!', 'error');
        //   return;
        // }

        const filterData = Object.fromEntries(
          Object.entries(values)?.filter(([key, value]) => value !== undefined),
        );

        // add service in onchain
        if (mode === ADD) {
          // onchain
          try {
            // Initialize FHEVM if not already initialized
            if (!fhe) {
              fhe = await initializeFheInstance();
            }
            if (!fhe) throw new Error('Failed to initialize FHE instance');

            // encrypted by zama fhe
            setEncrypt('Encrypting...');
            // for instant ui render
            await new Promise((r) => setTimeout(r, 0));

            const ciphertext = await fhe.createEncryptedInput(contractAddress, address);

            console.log({ priceee: filterData?.price });

            const price = parseEther((filterData as any)?.price);
            const name = filterData?.name;

            ciphertext.add64(BigInt(price));
            const { handles, inputProof } = await ciphertext.encrypt();

            const encryptedPrice = hexlify(handles[0]);
            const proofHex = hexlify(inputProof);

            // await switchChainAsync({ chainId: 11155111 });
            // const serviceId = service?.id ?? Date.now();

            const serviceId = (address as string) + Date.now();
            const txData: any = {
              address: contractAddress,
              abi: ABI,
              functionName: 'addService',
              args: [serviceId, name, encryptedPrice, proofHex],
              chainId: 11155111,
            };

            setEncrypt('Waiting for tx confirmation...');
            await simulateContract(config, txData);

            const serviceFee = parseEther((SERVICE_FEE as any)?.toString());

            await writeContractAsync({ ...txData, value: serviceFee });

            setEncrypt('Checking status...');
          } catch (error: any) {
            showToast(error?.message, 'error');
            setEncrypt('');
          }
          // onchain endd ---------------------------

          // then store in db
          const res: any = await handleCreateService({
            ...filterData,
            image: imageUrl,
            price: Number(filterData?.price),
          } as IService);

          if (res?.data?.id) {
            message.success('Service added successfully');
            form.resetFields();
            // router.push("/dashboard/admin/manage-services");
          }
        }

        if (mode === EDIT) {
          const res: any = await handleUpdateService({
            id: service?.id,
            ...filterData,
            image: imageUrl ? imageUrl : undefined,
            price: Number(filterData?.price),
          });

          if (res?.data?.id) {
            message.success('Service updated successfully');
            router.push('/dashboard/admin/manage-services');
          }
        }
      })
      .catch((error) => {
        // console.log({ error });
        message.error(error?.message || 'Something went wrong');
      });
  };

  // if (isLoading2) {
  //   return <Loader />;
  // }

  return (
    <>
      <Form layout="vertical" form={form} name="Services">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold p-2">
              {mode === 'ADD' ? 'Add New Service' : `Edit Service`}{' '}
            </h2>

            {/* show tx  */}
            <div className="font-bold text-lg text-green-400 py-2 loader1">
              {encrypt && (
                <>
                  <Spin /> {encrypt}
                </>
              )}
            </div>

            <div className="mb-3">
              <Button
                className="mr-2"
                onClick={() => {
                  router.back();
                }}
              >
                Discard
              </Button>
              <Button
                type="primary"
                onClick={() => onFinish()}
                htmlType="submit"
                loading={isLoading || updateLoading || encrypt ? true : false}
              >
                {mode === 'ADD' ? 'Add' : `Save`}
              </Button>
            </div>
          </div>
        </div>

        <div className="container">
          <GeneralField setImageUrl={setImageUrl} image={service?.image} />
        </div>
      </Form>
    </>
  );
};

export default ServiceForm;
