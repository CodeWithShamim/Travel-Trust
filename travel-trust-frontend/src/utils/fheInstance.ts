// fheClient.ts
let fheInstance: any = null;

import { TravelTrustContract } from '@/lib/contracts';
import { config } from '@/lib/Wagmi';
import { initSDK, createInstance, SepoliaConfig } from '@zama-fhe/relayer-sdk/bundle';
import { Signer } from 'ethers';
import { signTypedData } from 'wagmi/actions';

export async function initializeFheInstance() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Ethereum provider not found. Please install MetaMask or connect a wallet.');
  }

  await initSDK(); // Loads WASM

  const config = { ...SepoliaConfig };
  try {
    fheInstance = await createInstance(config);

    return fheInstance;
  } catch (err) {
    console.error('FHEVM instance creation failed:', err);
    throw err;
  }
}

export function getFheInstance() {
  return fheInstance;
}

// Decrypt a single encrypted value using the relayer
export async function decryptValue(encryptedHandle: string): Promise<any> {
  if (!fheInstance) {
    await initializeFheInstance();
  }

  if (!/^0x[a-fA-F0-9]{64}$/.test(encryptedHandle)) {
    throw new Error('Invalid ciphertext handle for decryption');
  }

  try {
    const values = await fheInstance.publicDecrypt([encryptedHandle]);
    return Number(values[encryptedHandle]);
  } catch (error: any) {
    if (error?.message?.includes('fetch') || error?.message?.includes('NetworkError')) {
      throw new Error('Decryption service is temporarily unavailable. Please try again later.');
    }
    if (error) {
      throw new Error(error.message);
    }
    throw error;
  }
}

/**
 * Request user decryption with EIP-712 signature
 */
export async function requestUserDecryption(signer: Signer, ciphertextHandle: string) {
  const relayer = getFheInstance();
  if (!relayer) {
    throw new Error('FHEVM not initialized');
  }

  try {
    const keypair = relayer.generateKeypair();
    const handleContractPairs = [
      {
        handle: ciphertextHandle,
        contractAddress: TravelTrustContract.address,
      },
    ];

    const startTimeStamp = Math.floor(Date.now() / 1000).toString();
    const durationDays = '10';
    const contractAddresses = [TravelTrustContract.address];

    const eip712 = relayer.createEIP712(
      keypair.publicKey,
      contractAddresses,
      startTimeStamp,
      durationDays,
    );

    const signature = await signer.signTypedData(
      eip712.domain,
      {
        UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification,
      },
      eip712.message,
    );

    const result = await relayer.userDecrypt(
      handleContractPairs,
      keypair.privateKey,
      keypair.publicKey,
      signature.replace('0x', ''),
      contractAddresses,
      await signer.getAddress(),
      startTimeStamp,
      durationDays,
    );

    return Number(result[ciphertextHandle]);
  } catch (error: any) {
    // Check for relayer/network error
    if (error?.message?.includes('Failed to fetch') || error?.message?.includes('NetworkError')) {
      throw new Error('Decryption service is temporarily unavailable. Please try again later.');
    }
    throw error;
  }
}
