# TRAVEL TRUST

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/website-up-down-green-red/https/travel-trust-codewithshamim.vercel.app.svg)](https://travel-trust-codewithshamim.vercel.app/)

[**API DOCUMENTATION**](https://documenter.getpostman.com/view/22498570/2s9YeHZqod) you can skip now

**Smart Contract Address:**
[`0xa9c82540317E6e1773618e5a4243027B1200d6AF`](https://sepolia.etherscan.io/address/0xa9c82540317E6e1773618e5a4243027B1200d6AF)

**Live DAPP Link:** [https://travel-trust.vercel.app](https://travel-trust.vercel.app)

## Overview

**Travel Trust** is a modern full-stack travel booking platform built to simplify trip planning, from flights to hotels and tours, while maintaining **data privacy, financial transparency, and user trust**.

In this latest version, Travel Trust integrates **Fully Homomorphic Encryption (FHE)** using **Zama’s FHEVM protocol** to protect sensitive on-chain data. Ratings and service prices are now stored and computed **encrypted**, ensuring that **only authorized parties (users & admins)** can decrypt and view the plaintext values.

<div>
<a href="https://travel-trust-codewithshamim.vercel.app/" target="_blank"><img src="https://res.cloudinary.com/djdrjwmfc/image/upload/v1701278495/1_htlvf2.png" alt="Alt Text" width="100%"></a>

<a href="https://travel-trust-codewithshamim.vercel.app/" target="_blank"><img src="https://res.cloudinary.com/djdrjwmfc/image/upload/v1701278497/2_mkpshm.png" alt="Alt Text" width="30%"></a>
<a href="https://travel-trust-codewithshamim.vercel.app/" target="_blank"><img src="https://res.cloudinary.com/djdrjwmfc/image/upload/v1701278496/3_p9jqrc.png" alt="Alt Text" width="30%"></a>
<a href="https://travel-trust-codewithshamim.vercel.app/" target="_blank"><img src="https://res.cloudinary.com/djdrjwmfc/image/upload/v1701278495/4_pulhjw.png" alt="Alt Text" width="30%"></a>

</div>

---

## 🧠 Technologies Used

| Stack                         | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| **Next.js + TypeScript**      | Frontend framework for SSR and client apps       |
| **Redux Toolkit + RTK Query** | State and API data management                    |
| **TailwindCSS + AntDesign**   | UI styling and design system                     |
| **Node.js + Express**         | Backend API layer                                |
| **Prisma + PostgreSQL**       | ORM and relational database                      |
| **Solidity**                  | For smart contract develop                       |
| **Zama FHEVM**                | On-chain encryption with homomorphic computation |
| **@zama-fhe/relayer-sdk**     | Secure encryption/decryption flows on frontend   |
| **Mapbox + Google Maps API**  | Interactive travel visualization                 |
| **Stripe & Crypto Payments**  | Dual payment gateway support                     |

---

## 🧩 FHE Integration Summary

- Smart contracts use the **official Zama Solidity library**:

```solidity
import { FHE, euint64, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";
```

- Use `FHE.allow`, `FHE.allowThis`, and `FHE.makePubliclyDecryptable` for permissions.
- Only `euint32` / `euint64` support arithmetic. `euint256` / `eaddress` support comparisons & bitwise ops only.
- Frontend uses the **Relayer SDK** to create encrypted inputs (`createEncryptedInput`) and decrypt (`userDecrypt` / `publicDecrypt`).

---

## 🔐 Key Enhancements (FHE-Enabled)

- **Encrypted User Ratings:** User ratings are encrypted client-side; only the user and admin can decrypt them.
- **Encrypted Service Prices:** All service pricing logic is performed on encrypted data via Zama FHEVM.
- **Crypto Payments:** Added secure crypto payment options during service bookings.
- **Dual Decryption Flow:** Supports both **private (user)** and **public (admin)** decryption workflows.
- **FHE Access Control:** Uses `FHE.allow`, `FHE.allowThis`, and `FHE.allowTransient` for fine-grained access permissions.

---

## Features

- Spearheaded the implementation of a comprehensive dashboard, empowering administrators to efficiently manage service bookings, user interactions, and overall platform activities.

- Successfully implemented real-time notification functionality, enhancing user engagement and providing instant updates on bookings and travel-related information.

- Integrated Stripe payment gateway, enabling secure and seamless online payment transactions for customers, resulting in improved user experience and increased revenue.

- Developed a messaging system to facilitate communication between clients, travel agents, and other stakeholders, fostering efficient and direct communication channels within the platform.

- Integrated Mapbox for interactive maps, enhancing the user interface and providing users with a visually appealing and informative experience when planning their travels.

- **Interactive User Interface:**

  - User-friendly interface that allows users to navigate the website easily and find information.

- **Booking and Reservation System:**

  - An integrated system that enables users to book flights, hotels, and other services.

- **User Reviews and Ratings:**

  - A section where users can share their experiences, reviews, and ratings about the service.

- Actively involved in optimizing application performance, scalability, and security to ensure a robust and reliable travel platform.

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- yarn: [Install here](https://classic.yarnpkg.com/lang/en/docs/install) OR pnpm
- Hardhat: [quick start](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)

---

## ⚙️ Environment Setup

### Frontend `.env`

```env
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_CLOUD_NAME=
NEXT_PUBLIC_UPLOAD_RRESET=
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_API_SECRET=

NEXT_PUBLIC_GOOGLE_MAP_API_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=

NEXT_PUBLIC_YT_VIDEO_URL=https://youtu.be/QoaDkejcHSc?si=oY8K_NZD5sYdNWKr

NEXT_PUBLIC_NODE_ENV=
NEXT_PUBLIC_FB_APP_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
NEXT_PUBLIC_INFURA_API_KEY=
NEXT_PUBLIC_API_FRONTEND_URL=http://localhost:3000

MNEMONIC=
PRIVATE_KEY=private_key
FHEVM_RPC_URL=https://api.zama.ai/fhevm/sepolia
ORT_GAS="true"
ETHERSCAN_API_KEY=WYPGYD1UN3E7JYZHIZC246T65M3NB3GBST

NEXT_PUBLIC_CONTRACT_ADDRESS=0xa9c82540317E6e1773618e5a4243027B1200d6AF
NEXT_PUBLIC_SERVICE_OWNER=0x197BDAB29923e997672785d329fF063FF6591545
NEXT_PUBLIC_SERVICE_FEE=0.01
```

### Backend `.env`

you can skip now

```env
NODE_ENV=development
PORT=5000
BCRYPT_SALT_ROUNDS=12
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=
```

---

## 🚀 Getting Started

### Frontend Setup

```bash
git clone https://github.com/CodeWithShamim/Travel-Trust
cd travel-trust-frontend
yarn install
yarn dev
```

Visit: **[http://localhost:3000](http://localhost:3000)**

### Backend Setup

```bash
cd travel-trust-backend
yarn install
npx prisma migrate dev
yarn dev
```

Visit: **[http://localhost:8000](http://localhost:8000)**

---

#Frontend Folder Architecture

```bash
├── travel-trust-frontend
│   ├── .env
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── README.md
│   ├── contracts
│   │   ├── TravelTrust.sol
│   ├── deploy
│   │   ├── deploy.ts
│   ├── global.d.ts
│   ├── hardhat.config.ts
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.mjs
│   ├── public
│   │   ├── logo.png
│   │   ├── next.svg
│   │   ├── notifacation.wav
│   │   ├── send.mp3
│   │   ├── travel Trust-logo
│   │   │   ├── default.png
│   │   ├── vercel.svg
│   ├── src
│   │   ├── abi
│   │   │   ├── TravelTrust.json
│   │   ├── app
│   │   │   ├── [lang]
│   │   │   │   ├── (subRootLayout)
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── service
│   │   │   │   │   │   ├── search
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── service-details
│   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   ├── dashboard
│   │   │   │   │   ├── (adminProtectedLayout)
│   │   │   │   │   │   ├── admin
│   │   │   │   │   │   │   ├── (service)
│   │   │   │   │   │   │   │   ├── add-service
│   │   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   ├── edit-service
│   │   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   │   ├── manage-services
│   │   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   ├── manage-bookings
│   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── layout.tsx
│   │   │   │   │   │   ├── manage-users
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── super_admin
│   │   │   │   │   │   │   ├── manage-admins
│   │   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── profile
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── user
│   │   │   │   │   │   ├── bookings
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── message
│   │   │   │   │   ├── page.tsx
│   │   │   ├── error.tsx
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── page.module.css
│   │   ├── assets
│   │   │   ├── 404.webp
│   │   │   ├── banner1.webp
│   │   │   ├── banner2.webp
│   │   │   ├── banner3.webp
│   │   │   ├── cart.webp
│   │   │   ├── chat-bg.jpg
│   │   │   ├── chat-bg2.jpg
│   │   │   ├── error.webp
│   │   │   ├── footer-top.webp
│   │   │   ├── footer.webp
│   │   │   ├── home1.webp
│   │   │   ├── home2.webp
│   │   │   ├── login.webp
│   │   │   ├── pay.png
│   │   │   ├── play.webp
│   │   │   ├── profile-banner.webp
│   │   │   ├── search-not-found.webp
│   │   │   ├── select.png
│   │   ├── components
│   │   │   ├── charts
│   │   │   │   ├── LineChart.tsx
│   │   │   │   ├── PiChart.tsx
│   │   │   ├── common
│   │   │   │   ├── ConnectWallet.tsx
│   │   │   │   ├── DateTime.tsx
│   │   │   │   ├── FhScript.tsx
│   │   │   │   ├── MouseScroll.tsx
│   │   │   │   ├── PaymentModal.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── UserInfo.tsx
│   │   │   ├── forms
│   │   │   │   ├── Form.tsx
│   │   │   │   ├── FormInput.tsx
│   │   │   ├── skeletons
│   │   │   │   ├── ServiceCardSkeleton.tsx
│   │   │   ├── ui
│   │   │   │   ├── BottomBar.tsx
│   │   │   │   ├── CartCard.tsx
│   │   │   │   ├── ChatMessage.tsx
│   │   │   │   ├── Confetti.tsx
│   │   │   │   ├── CryptoPaymentForm.tsx
│   │   │   │   ├── CustomSelect.tsx
│   │   │   │   ├── EditModal.tsx
│   │   │   │   ├── FhevmCard.tsx.tsx
│   │   │   │   ├── FilterSideBar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── HomeBackButton.tsx
│   │   │   │   ├── ImageGallery.tsx
│   │   │   │   ├── LanguageSwitcher.tsx
│   │   │   │   ├── Loader.tsx
│   │   │   │   ├── MapView.tsx
│   │   │   │   ├── NewsCard.tsx
│   │   │   │   ├── ReviewCard.tsx
│   │   │   │   ├── ReviewSlider.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   ├── ShareService.tsx
│   │   │   │   ├── SideBar.tsx
│   │   │   │   ├── SponsorCarousel.tsx
│   │   │   │   ├── StripePaymentForm.tsx
│   │   │   │   ├── TTTable.tsx
│   │   │   │   ├── TableColTitle.tsx
│   │   │   │   ├── UpdateUserInfo.tsx
│   │   │   │   ├── VideoPlayer.tsx
│   │   ├── constants
│   │   │   ├── booking.ts
│   │   │   ├── colors.ts
│   │   │   ├── commons.tsx
│   │   │   ├── map.ts
│   │   │   ├── role.ts
│   │   │   ├── service.tsx
│   │   │   ├── sidebarItems.tsx
│   │   │   ├── storageKey.ts
│   │   │   ├── url.ts
│   │   ├── data
│   │   │   ├── common.ts
│   │   │   ├── dictionaries
│   │   │   │   ├── bn.json
│   │   │   │   ├── en.json
│   │   │   │   ├── hi.json
│   │   │   ├── news.ts
│   │   │   ├── service.tsx
│   │   ├── helpers
│   │   │   ├── axios
│   │   │   │   ├── axiosBaseQuery.ts
│   │   │   │   ├── axiosInstance.ts
│   │   │   ├── config
│   │   │   │   ├── envConfig.ts
│   │   │   ├── persist
│   │   │   │   ├── user.persist.ts
│   │   ├── lib
│   │   │   ├── AntdRegistry.tsx
│   │   │   ├── Providers.tsx
│   │   │   ├── Wagmi.tsx
│   │   │   ├── contracts.ts
│   │   ├── middleware.ts
│   │   ├── redux
│   │   │   ├── api
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── authApi.ts
│   │   │   │   ├── baseApi.ts
│   │   │   │   ├── bookingApi.ts
│   │   │   │   ├── messageApi.ts
│   │   │   │   ├── notificationApi.ts
│   │   │   │   ├── paymentApi.ts
│   │   │   │   ├── reviewApi.ts
│   │   │   │   ├── serviceApi.ts
│   │   │   ├── hooks.ts
│   │   │   ├── rootReducer.ts
│   │   │   ├── slices
│   │   │   │   ├── i18nSlice.ts
│   │   │   │   ├── serviceSlice.ts
│   │   │   │   ├── userSlice.ts
│   │   │   ├── store.ts
│   │   ├── styles
│   │   │   ├── common.module.css
│   │   │   ├── footer.module.css
│   │   │   ├── home.module.css
│   │   │   ├── loader.module.css
│   │   ├── utils
│   │   │   ├── base64.ts
│   │   │   ├── common.ts
│   │   │   ├── dictionaries.ts
│   │   │   ├── events.ts
│   │   │   ├── fheInstance.ts
│   │   │   ├── jwt.ts
│   │   │   ├── local-storage.ts
│   │   │   ├── motion.ts
│   │   │   ├── upload.ts
│   │   ├── views
│   │   │   ├── Home.tsx
│   │   │   ├── Notification.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── ServiceDetails.tsx
│   │   │   ├── adminDashboard
│   │   │   │   ├── ManageAdmin.tsx
│   │   │   │   ├── ManageBooking.tsx
│   │   │   │   ├── ManageUser.tsx
│   │   │   │   ├── service
│   │   │   │   │   ├── ManageService.tsx
│   │   │   │   │   ├── ServiceForm
│   │   │   │   │   │   ├── GeneralField.tsx
│   │   │   │   │   │   ├── index.tsx
│   │   │   ├── message
│   │   │   │   ├── index.tsx
│   ├── tailwind.config.js
│   ├── test
│   │   ├── TravelTrust.test.ts
│   ├── tsconfig.json
│   ├── vercel.json

```

---

## 🔗 Example: FHE Smart Contract (Ratings)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import { FHE, euint64, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";

contract TravelTrustRatings {
   // service owner -> serviceId -> Service
  mapping(address => mapping(string => Service)) public services;

  // serviceId -> reviwer => Revieww
  mapping(string => mapping(address => Review)) public reviews;

  event ReviewSubmitted(address indexed reviewer, string indexed serviceId);

    function submitReview(
    address serviceOwner,
    string memory serviceId,
    externalEuint8 encryptedRating,
    bytes calldata inputProof,
    string calldata comment
  ) external {
    Service storage svc = services[serviceOwner][serviceId];
    require(svc.owner != address(0), 'Service not found');

    // don't allow same reviewer to submit twice
    require(!reviews[serviceId][msg.sender].exists, 'Review already submitted');

    euint8 rating = FHE.fromExternal(encryptedRating, inputProof);

    // allow for revieww + current contract
    FHE.allow(rating, msg.sender);
    FHE.allowThis(rating);

    // update stats
    euint32 rating32 = FHE.asEuint32(rating);
    euint32 one = FHE.asEuint32(1);

    ServiceStats storage stats = serviceStats[serviceId];
    stats.totalSum = FHE.add(stats.totalSum, rating32);
    stats.totalCount = FHE.add(stats.totalCount, one);

    FHE.allowThis(stats.totalSum);
    FHE.allowThis(stats.totalCount);

    reviews[serviceId][msg.sender] = Review({rating: rating, comment: comment, exists: true});

    emit ReviewSubmitted(msg.sender, serviceId);
  }
}
```

---

## 🌐 Frontend Example: Relayer SDK Flow

```ts
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
```

---

# Testing

### Comprehensive FHE Test Suite

### Test Commands

```bash
# Run all tests

yarn test

```

Test Results ✅

```bash
 TravelTrust test
    ✔ Should set the owner correctly
    ✔ Swner can withdraw service fees
    ✔ Should add a new service
    ✔ Prevents duplicate services
    ✔ Allows payment for a service with FHE decryption
    ✔ Prevents duplicate payments
    ✔ Submits a review and prevents duplicates
    ✔ Ping works only for owner


  8 passing (213ms)
```

---

## 🔒 Security Guidelines

- Always manage `PRIVATE_KEY` and admin access securely.
- Never expose plaintext FHE data on-chain or in logs.
- Use `FHE.allow` strictly for authorized roles.
- Validate attestation signatures before accepting external ciphertexts.
- Use limited bit-width encrypted types to optimize gas and latency.

---

## 🤝 Contributing

We welcome community contributions!

1. Fork the repo.
2. Create a feature branch.
3. Implement and test.
4. Submit a PR with a clear description.

Please ensure FHE code additions follow Zama’s latest [Relayer SDK Guides](https://docs.zama.ai/protocol/relayer-sdk-guides/).

---

## 📬 About

**Author:** Shamim Islam
