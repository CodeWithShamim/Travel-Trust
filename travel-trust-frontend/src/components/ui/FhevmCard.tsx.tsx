'use client';

import { Card } from 'antd';
import {
  LockOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  StarOutlined,
} from '@ant-design/icons';
import React from 'react';

const cards = [
  {
    icon: <LockOutlined style={{ fontSize: 36, color: '#FFD20A' }} />,
    title: 'Encrypted Service Pricing',
    description:
      'Every travel service price is fully encrypted using ZAMA FHEVM — ensuring business data stays private and secure on-chain.',
  },
  {
    icon: <StarOutlined style={{ fontSize: 36, color: '#FFD20A' }} />,
    title: 'Confidential Service Reviews',
    description:
      'Travelers can leave ratings and feedback with full confidentiality — encrypted directly in their browser.',
  },
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: 36, color: '#FFD20A' }} />,
    title: 'On-Chain Privacy',
    description:
      'Encrypted booking and transaction data are stored on-chain — no one, not even TravelTrust, can view user details.',
  },
  {
    icon: <ToolOutlined style={{ fontSize: 36, color: '#FFD20A' }} />,
    title: 'Verifiable Transactions',
    description:
      'Every payment and review is verifiable and processed securely on-chain using fully homomorphic encryption (FHE).',
  },
  {
    icon: <CheckCircleOutlined style={{ fontSize: 36, color: '#FFD20A' }} />,
    title: 'Guaranteed Fairness',
    description:
      'Privacy and trust are mathematically guaranteed — ensuring an unbiased, transparent travel experience for all.',
  },
];

const FHEVMCards = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="text-[#FFD20A] font-semibold py-1 rounded-full text-sm">
        Powered by ZAMA FHEVM — Encrypted TravelTrust
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-[1200px] w-full px-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="rounded-2xl shadow-sm text-center hover:shadow-md transition-all"
            style={{
              borderColor: '#FFD20A',
            }}
          >
            <div className="flex flex-col items-center gap-3">
              {card.icon}
              <h3 className="text-lg font-semibold text-[#FFD20A]">{card.title}</h3>
              <p className="text-gray-700 text-sm">{card.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FHEVMCards;
