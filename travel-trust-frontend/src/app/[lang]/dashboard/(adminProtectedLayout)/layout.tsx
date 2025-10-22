'use client';
import Loader from '@/components/ui/Loader';
import { USER_ROLE } from '@/constants/role';
import { useAppSelector, useAppToast } from '@/redux/hooks';
import { initializeFheInstance } from '@/utils/fheInstance';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, isLoading } = useAppSelector((state) => state.user);
  const user: any = data;

  const { address, isConnected } = useAccount();
  const { showToast } = useAppToast();

  const initializeFhevm = async () => {
    try {
      await initializeFheInstance();
      console.log('✅ FHEVM initialized!');
    } catch (error) {
      showToast('FHEVM initialization failed:', 'error');
    }
  };

  useEffect(() => {
    // if (user?.role === USER_ROLE.USER && !isLoading) {
    //   router.push('/');
    // }

    if (!isConnected || !address) {
      showToast('Please connect your wallet.', 'error');
    }

    initializeFhevm();
  }, [isConnected, address]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AdminLayout;
