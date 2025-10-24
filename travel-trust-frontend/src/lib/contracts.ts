import CONTRACTABI from '@/abi/TravelTrust.json';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const SERVICE_OWNER = process.env.NEXT_PUBLIC_SERVICE_OWNER;
export const SERVICE_FEE = process.env.NEXT_PUBLIC_SERVICE_FEE;

const {abi} = CONTRACTABI;

export const TravelTrustContract = {
  address: CONTRACT_ADDRESS as `0x${string}`,
  abi,
} as const;
