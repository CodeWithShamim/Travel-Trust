'use client';

import React from 'react';
import NextTopLoader from 'nextjs-toploader';

const ProgressBar = () => {
  return (
    <NextTopLoader
      color="#FFD20A"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
    />
  );
};

export default ProgressBar;
