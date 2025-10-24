'use client';
import Loader from '@/components/ui/Loader';
import { USER_ROLE } from '@/constants/role';
import { useAppSelector, useAppToast } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, isLoading } = useAppSelector((state) => state.user);
  const user: any = data;

  const { address, isConnected } = useAccount();
  const { showToast } = useAppToast();

  useEffect(() => {
    // if (user?.role === USER_ROLE.USER && !isLoading) {
    //   router.push('/');
    // }

    if (!isConnected || !address) {
      showToast('Please connect your wallet.', 'error');
    }
  }, [isConnected, address]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AdminLayout;
