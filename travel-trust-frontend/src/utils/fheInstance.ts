// fheClient.ts
import { initSDK, createInstance, SepoliaConfig } from '@zama-fhe/relayer-sdk';

let fheInstance: Awaited<ReturnType<typeof createInstance>> | null = null;

export async function initializeFheInstance() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Ethereum provider not found. Please install MetaMask or connect a wallet.');
  }

  await initSDK(); // loads WASM & relayer runtime

  const config = { ...SepoliaConfig, network: window.ethereum };

  try {
    fheInstance = await createInstance(config);
    console.log('✅ FHEVM instance initialized');
    return fheInstance;
  } catch (err) {
    console.error('FHEVM instance creation failed:', err);
    throw err;
  }
}

export function getFheInstance() {
  if (!fheInstance)
    throw new Error('FHE instance not initialized. Call initializeFheInstance() first.');
  return fheInstance;
}

// Decrypt a single encrypted value using the relayer
export async function decryptValue(encryptedHandle: string): Promise<number> {
  const fhe = getFheInstance();

  if (!/^0x[a-fA-F0-9]{64}$/.test(encryptedHandle)) {
    throw new Error('Invalid ciphertext handle for decryption');
  }

  try {
    const values = await fhe.publicDecrypt([encryptedHandle]);
    return Number(values[encryptedHandle]);
  } catch (error: any) {
    if (error?.message?.includes('fetch') || error?.message?.includes('NetworkError')) {
      throw new Error('Decryption service is temporarily unavailable. Please try again later.');
    }
    throw error;
  }
}
