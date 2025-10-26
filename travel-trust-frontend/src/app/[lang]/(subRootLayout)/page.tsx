import Home from '@/views/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel trust',
  description: 'Travel trust is on of the best travel agency',
  creator: 'Shamim Islam',
};

export default async function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
