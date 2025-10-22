import { AppDispatch, RootState } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { backendURL } from '@/constants/url';
import { dynamicBlurDataUrl } from '@/utils/base64';
import toast, { ToastOptions } from 'react-hot-toast';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IDebounced {
  searchQuery: string;
  delay: number;
}

export const useDebounced = ({ searchQuery, delay }: IDebounced) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchQuery, delay]);

  return debouncedValue;
};

export const useSocket = () => {
  const [socket, setSocket] = useState<any>();

  useEffect((): any => {
    const newSocket = io(backendURL?.split('/api')[0]);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return socket;
};

export const useBlurDataURL = (image: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blurDataURL, setBlurDataURL] = useState<string>('');

  useEffect(() => {
    const getBlurDataURL = async () => {
      setIsLoading(true);
      const res = await dynamicBlurDataUrl(image);
      setBlurDataURL(res);
      setIsLoading(false);
    };

    image && getBlurDataURL();
  }, [image]);

  return { blurDataURL, isLoading };
};

export const useAppToast = () => {
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'loading' = 'info',
    options?: ToastOptions,
  ) => {
    const baseOptions: ToastOptions = {
      duration: 3000,
      position: 'bottom-right',
      style: {
        backgroundColor: type === 'error' ? 'red' : 'green',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
      },
      ...options,
    };

    switch (type) {
      case 'success':
        toast.success(message, baseOptions);
        break;
      case 'error':
        toast(message, baseOptions);
        break;
      case 'loading':
        toast.loading(message, baseOptions);
        break;
      default:
        toast(message, baseOptions);
    }
  };

  return { showToast };
};

import { useReadContract } from 'wagmi';
import { TravelTrustContract } from '@/lib/contracts';

export function useService(ServiceId: number) {
  const { data: service } = useReadContract({
    ...TravelTrustContract,
    functionName: 'getService',
    args: [BigInt(ServiceId)],
  });

  const { data: reviews } = useReadContract({
    ...TravelTrustContract,
    functionName: 'getReviews',
    args: [BigInt(ServiceId)],
  });

  return {
    service,
    reviews,
  };
}
