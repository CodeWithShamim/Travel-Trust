'use client';

import React, { useEffect, useState } from 'react';
import { Form, Button, message } from 'antd';

import { useParams, useRouter } from 'next/navigation';
import GeneralField from './GeneralField';
import {
  useCreateServiceMutation,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from '@/redux/api/serviceApi';
import { IService } from '@/types';
import Loader from '@/components/ui/Loader';
import { hexlify } from 'ethers';
import { getFheInstance, initializeFheInstance } from '@/utils/fheInstance';
import TravelTrustABI from '@/abi/TravelTrust.json';
import { useAccount, useWriteContract } from 'wagmi';
import { useAppToast } from '@/redux/hooks';

const ADD = 'ADD';
const EDIT = 'EDIT';

const ServiceForm = ({ mode = ADD }: { mode?: 'ADD' | 'EDIT' }) => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');

  const [handleCreateService, { isLoading }] = useCreateServiceMutation();
  const [handleUpdateService, { isLoading: updateLoading }] = useUpdateServiceMutation();

  const { data: service, isLoading: isLoading2, error } = useGetSingleServiceQuery(id as string);

  const { showToast } = useAppToast();

  // onchain ----
  const { address, isConnected } = useAccount();
  let fhe = getFheInstance();
  const contractAddress: any = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '0xTest';
  const ABI: any = TravelTrustABI.abi;

  const [encrypt, setEncrypt] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (mode === EDIT) {
      form.setFieldsValue(service);
    }
  }, [form, mode, service]);

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (!imageUrl && mode === ADD) {
          message.error('Image is required!');
          return;
        }

        const filterData = Object.fromEntries(
          Object.entries(values)?.filter(([key, value]) => value !== undefined),
        );

        // add service in onchain
        if (mode === ADD) {
         
          const res: any = await handleCreateService({
            ...filterData,
            image: imageUrl,
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

  if (isLoading2) {
    return <Loader />;
  }

  return (
    <>
      <Form layout="vertical" form={form} name="Services">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold p-2">
              {mode === 'ADD' ? 'Add New Service' : `Edit Service`}{' '}
            </h2>
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
                loading={isLoading || updateLoading}
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
