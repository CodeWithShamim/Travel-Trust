import React from 'react';
import { Metadata } from 'next';
import Documentation from '@/views/Documentation';

export const metadata: Metadata = {
  title: 'Travel Trust | Docs',
  description: 'Docs for service',
};

const docsPage = () => {
  return (
    <div>
      <Documentation />
    </div>
  );
};

export default docsPage;
