'use client';

import Script from 'next/script';
import React from 'react';

export default function FhScript() {
  return (
    <Script
      src="https://cdn.zama.org/relayer-sdk-js/0.3.0-5/relayer-sdk-js.umd.cjs"
      strategy="afterInteractive"
      onLoad={async () => {
        console.log('✅ ZamaRelayerSDK script loadeddddd');

        const { initializeFheInstance } = await import('@/utils/fheInstance');

        const initializeFhevm = async () => {
          try {
            await initializeFheInstance();
            console.log('✅ FHEVM initialized!');
          } catch (error: any) {
            console.log(error.message);
          }
        };

        initializeFhevm();
      }}
    />
  );
}
