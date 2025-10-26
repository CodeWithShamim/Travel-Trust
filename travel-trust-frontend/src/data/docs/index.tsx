import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

export const docs: any = {
  overview: {
    title: 'Overview',
    content: (
      <>
        <p className="md:max-w-[750px]">
          <span className="text-lg text-amber-600 font-bold">Travel Trust</span> is a decentralized
          travel booking DApp that redefines how users plan, book, and review their travel
          experiences. It integrates blockchain technology, privacy-preserving encryption, and
          modern Web3 infrastructure to deliver transparent, trust-based interactions between
          travelers, agents, and service providers , without relying on centralized intermediaries.
        </p>
        <p className="md:max-w-[750px]">
          The platform enables users to search, compare, and book flights, hotels, and tours while
          maintaining full control of their personal data. Using{' '}
          <span className="text-amber-600 font-bold pr-1">Fully Homomorphic Encryption (FHE)</span>
          via Zama FHEVM, all sensitive computations , such as encrypted ratings and service pricing
          , are performed on-chain without exposing user information.
        </p>
      </>
    ),
  },

  technologies: {
    title: '🧠 Technologies Used',
    content: (
      <div className="gap-10">
        <p>
          Travel Trust is built using a robust modern Web3 stack optimized for scalability,
          performance, and privacy:
        </p>
        <ul className="list-disc pl-6 space-y-1 gap-6 pt-6 flex flex-col">
          <li>Next.js 15 (App Router) + TypeScript for the frontend</li>
          <li>Ant Design + TailwindCSS for consistent, responsive UI/UX</li>
          <li>Express.js/Prisma for backend</li>
          <li>Solidity smart contracts for decentralized logic</li>
          <li>Hardhat for compilation, testing, and deployment automation</li>
          <li>Zama FHEVM for encrypted on-chain computation</li>
          <li>IPFS & Web3.Storage for decentralized file and media hosting</li>
          <li>Stripe API for Web2-compatible fiat payments</li>
          <li>Mapbox API for geolocation and route visualization</li>
        </ul>
      </div>
    ),
  },

  fheIntegration: {
    title: '🧩 FHE Integration Summary',
    content: (
      <>
        <p>
          <span className="text-amber-600 font-bold">Fully Homomorphic Encryption (FHE)</span> is a
          cryptographic technique that enables computations on encrypted data without decrypting it.
          In Travel Trust, FHE ensures user reviews, ratings, and pricing computations remain
          private , even when processed on the blockchain.
        </p>
        <ul className="list-disc pl-6 space-y-1 flex flex-col gap-4 pt-6">
          <li>Ratings are encrypted client-side before submission.</li>
          <li>
            Smart contracts use Zama’s <code>FHE.sol</code> library for secure computation.
          </li>
          <li>
            Admins and review user can only view decrypted analytics using authorized decryption
            keys.
          </li>
          <li>All on-chain operations comply with privacy-by-design principles.</li>
        </ul>
      </>
    ),
  },

  keyEnhancements: {
    title: '🔐 Key Enhancements',
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1 flex flex-col gap-4 pt-6">
          <li>End-to-end encryption for user reviews and pricing data</li>
          <li>Smart contracts audited for gas optimization and data safety</li>
          <li>Decentralized storage integration via IPFS</li>
          <li>Dynamic off-chain aggregation verified by zero-knowledge proofs</li>
          <li>FHE-based trustless rating system with encrypted computations</li>
        </ul>
      </>
    ),
  },

  features: {
    title: 'Features',
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1 flex flex-col gap-4 pt-6">
          <li>🧭 Transparent and decentralized travel booking ecosystem</li>
          <li>🔐 Privacy-preserving FHE rating and review system</li>
          <li>💳 On-chain escrow-based payment with optional Stripe gateway</li>
          <li>🛰️ Real-time location tracking using Mapbox</li>
          <li>🧩 DAO-based governance for dispute resolution</li>
          <li>📊 Admin dashboard for encrypted data visualization</li>
          <li>💬 Decentralized chat system for travelers and agents</li>
          <li>⚡ Optimized for scalability, modularity, and low latency</li>
        </ul>
      </>
    ),
  },

  gettingStarted: {
    title: 'Getting Started',
    content: (
      <>
        <h1 className="pt-6 text-xl">Prerequisites</h1>
        <p>Before running Travel Trust, ensure you have:</p>
        <ul className="list-disc pl-6 space-y-1 flex flex-col gap-4">
          <li>
            Node.js v18+ –{' '}
            <Link href="https://nodejs.org" target="_blank">
              Download
            </Link>
          </li>
          <li>
            Yarn or pnpm –{' '}
            <Link href="https://classic.yarnpkg.com" target="_blank">
              Install
            </Link>
          </li>
          <li>
            Hardhat –{' '}
            <Link href="https://hardhat.org/getting-started/" target="_blank">
              Docs
            </Link>
          </li>
          <li>MetaMask or WalletConnect for blockchain interaction</li>
        </ul>
        <h1 className="pt-6 text-xl">Quick Setup</h1>
        <pre>
          <code>{`git clone https://github.com/your-org/travel-trust
cd travel-trust
yarn install
yarn dev`}</code>
        </pre>
      </>
    ),
  },

  environmentSetup: {
    title: 'Environment Setup',
    content: (
      <>
        <p>
          Configure your <code>.env</code> file with the required environment variables:
        </p>
        <pre>
          <code>{`NEXT_PUBLIC_API_BASE_URL=
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
NEXT_PUBLIC_SERVICE_FEE=0.01`}</code>
        </pre>
        <p>
          To deploy contracts on testnets, update <code>hardhat.config.ts</code> with your private
          keys and RPCs.
        </p>
      </>
    ),
  },

  folderArchitecture: {
    title: 'Folder Architecture',
    content: (
      <>
        <pre>
          <code>{`├── travel-trust-frontend
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
│   ├── vercel.json`}</code>
        </pre>
        <p>
          The modular structure separates smart contracts, frontend logic, and infrastructure for
          better maintainability and scalability.
        </p>
      </>
    ),
  },

  smartContract: {
    title: 'Example Smart Contract',
    content: (
      <>
        <pre>
          <code>{`// SPDX-License-Identifier: MIT
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
}`}</code>
        </pre>
      </>
    ),
  },

  frontendExample: {
    title: 'Frontend Example (Relayer SDK)',
    content: (
      <>
        <p>Example of submitting an encrypted review using ethers.js and Zama’s FHE SDK:</p>
        <pre>
          <code>{`import { TravelTrustContract } from '@/lib/contracts';
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
}`}</code>
        </pre>
      </>
    ),
  },

  testing: {
    title: 'Testing',
    content: (
      <>
        <p>Use Hardhat to execute unit and integration tests:</p>
        <pre>
          <code>
            {`yarn test`}

            {`
Test Results ✅

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
 `}
          </code>
        </pre>
        <p>
          All tests are written using Chai and Mocha for reliability. Coverage reports are generated
          using the <code>solidity-coverage</code> plugin.
        </p>
      </>
    ),
  },

  security: {
    title: 'Security Guidelines',
    content: (
      <>
        <p>
          Security is the foundation of Travel Trust’s architecture. Each module undergoes code
          audits and implements strict data protection rules.
        </p>
        <ul className="list-disc pl-6 space-y-1 flex flex-col gap-4 pt-6">
          <li>Never expose encryption or private keys in client-side code.</li>
          <li>Use environment variables for secrets and API tokens.</li>
          <li>Run automated audits with Slither and Mythril before deployment.</li>
          <li>Follow OWASP and Web3 security standards for user-facing components.</li>
        </ul>
      </>
    ),
  },

  contributing: {
    title: 'Contributing',
    content: (
      <>
        <p>
          We welcome community contributions! 1. Fork the repo. 2. Create a feature branch. 3.
          Implement and test. 4. Submit a PR with a clear description. Please ensure FHE code
          additions follow Zama’s latest.
          <br />
          <br /> Relayer SDK Guides{' '}
          <a href="https://docs.zama.ai/protocol/relayer-sdk-guides">
            https://docs.zama.ai/protocol/relayer-sdk-guides
          </a>
        </p>
      </>
    ),
  },
  roadmap: {
    title: 'Roadmap',
    content: (
      <>
        <Paragraph>
          The <span className="text-amber-600 font-bold">Travel Trust</span> roadmap reflects our
          commitment to a fully decentralized, privacy-first travel ecosystem. Each milestone
          focuses on enhancing scalability, interoperability, and confidential data handling using{' '}
          <span className="text-amber-600 font-bold">Zama’s FHEVM</span>.
        </Paragraph>

        <Title level={4}>November 2025</Title>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            🧩 <Text strong>Full On-Chain Migration:</Text> All critical service modules (bookings,
            reviews, and payments) will transition entirely on-chain for verifiable transparency and
            auditability.
          </li>
          <li>
            ⚙️ <Text strong>Backend Optimization:</Text> Optimize APIs, caching, and decentralized
            storage integration for faster booking confirmations and reduced gas consumption.
          </li>
          <li>
            🔄 <Text strong>Full Platform Integration:</Text> Seamless integration between smart
            contracts, front-end relayers, and encrypted computation layers using FHE.
          </li>
        </ul>

        <br />
        <Title level={4}>December 2025</Title>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            🔐 <Text strong>Confidential Data Migration:</Text> Migrate all user and
            service-provider data into the <Text code>Zama FHEVM</Text> architecture to ensure that
            ratings, user preferences, and analytics remain fully encrypted on-chain.
          </li>
          <li>
            🌍 <Text strong>Decentralized Identity Integration:</Text> Introduce DID-based
            authentication for users and agents to enhance privacy and identity sovereignty.
          </li>
          <li>
            🚀 <Text strong>Scalability Phase:</Text> Roll out Layer-2 (L2) compatibility and
            relayer optimizations for near-instant travel transactions at minimal fees.
          </li>
        </ul>

        <Paragraph>
          Each roadmap milestone brings Travel Trust closer to becoming a{' '}
          <Text italic>fully confidential, user-owned, decentralized travel ecosystem</Text>,
          setting new standards in privacy-preserving Web3 travel technology.
        </Paragraph>
      </>
    ),
  },

  faq: {
    title: '❓ FAQ',
    content: (
      <>
        <Paragraph>
          Here are some of the most frequently asked questions about using the
          <Text strong> Travel Trust </Text> DApp and understanding its privacy-first, FHE-powered
          rating system.
        </Paragraph>

        <Title level={4}>1. How can I rate a service or experience?</Title>
        <Paragraph>
          To submit a rating, navigate to the service detail page (flight, hotel, or tour) and click
          the <span className="text-amber-600 font-bold">“Submit Review”</span> button. Your rating
          is immediately encrypted using the
          <Text code>FHE (Fully Homomorphic Encryption)</Text> protocol before it’s written to the
          blockchain. This ensures that no one , not even the platform administrators , can view
          your raw rating value without your consent.
        </Paragraph>

        <Title level={4}>2. How can I reveal or verify my rating?</Title>
        <Paragraph>
          Only you hold the decryption key for your encrypted rating. If you choose to reveal your
          rating publicly (for dispute resolution or transparency), you can use the
          <Text strong> “Reveal” </Text> option in your dashboard or under service details page.
          This securely decrypts your score using Zama’s <Text code>FHEVM</Text> framework and
          broadcasts a verified, plaintext proof of authenticity on-chain.
        </Paragraph>

        <Title level={4}>3. Are my reviews stored on-chain?</Title>
        <Paragraph>
          Yes. All reviews are stored in encrypted form on the blockchain using FHE-based smart
          contracts. Only authorized participants , typically the user who wrote the review and
          platform verifiers , can decrypt them.
        </Paragraph>

        <Title level={4}>4. How is data privacy maintained?</Title>
        <Paragraph>
          Travel Trust integrates <Text code>FHE (Fully Homomorphic Encryption)</Text> to enable
          computations directly on encrypted data. This means even when the smart contract
          calculates averages or aggregates reviews, it never exposes the raw values. Sensitive user
          information is never stored or transmitted in plaintext.
        </Paragraph>

        <Title level={4}>5. Can I edit or delete my rating later?</Title>
        <Paragraph>
          For integrity and auditability, once your rating is encrypted and submitted on-chain, it
          cannot be deleted or altered. However, you may post a follow-up review or disclosure if
          your experience changes over time. The protocol maintains full transparency and version
          control across all revisions.
        </Paragraph>

        <Title level={4}>6. How does Travel Trust ensure fair scoring?</Title>
        <Paragraph>
          The platform uses decentralized verification and encrypted averaging mechanisms. Ratings
          are combined using FHE computations, ensuring that no single participant can manipulate or
          bias aggregated results.
        </Paragraph>

        <Title level={4}>7. What happens if I lose my encryption key?</Title>
        <Paragraph>
          Your encryption key is locally generated and never stored by the platform. Losing it means
          you can no longer decrypt your past ratings or verify ownership. It’s recommended to back
          up your wallet or encryption metadata securely.
        </Paragraph>

        <Paragraph>
          For more questions, visit our{' '}
          <Link href="/support" target="_blank">
            Support Portal
          </Link>{' '}
          or join the{' '}
          <Link href="https://discord.gg" target="_blank">
            Travel Trust Discord
          </Link>{' '}
          for real-time help and discussions.
        </Paragraph>
      </>
    ),
  },

  about: {
    title: 'About',
    content: (
      <>
        <p>
          <Text strong>Travel Trust</Text> is an open-source initiative that bridges the gap between
          traditional travel infrastructure and decentralized Web3 technology. Its mission is to
          empower travelers with transparency, privacy, and ownership over their data while ensuring
          fairness and trust in every interaction.
        </p>
        <p>
          Built by a team of blockchain engineers, cryptographers, and travel tech experts, Travel
          Trust represents the next generation of trustless global booking ecosystems.
        </p>
      </>
    ),
  },
};
