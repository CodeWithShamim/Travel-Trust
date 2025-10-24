'use client';

import { reviewsLists } from '@/data/service';
import { Button, Divider, Rate } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import defaultImage from '@/assets/login.webp';
import { IReview } from '@/types';
import { decryptValue, requestUserDecryption } from '@/utils/fheInstance';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { useAppToast } from '@/redux/hooks';

type IReviewCardProps = {
  review: {
    rating: string;
    comment: string;
    user: any;
  };
};

const ReviewCard = ({ review }: IReviewCardProps) => {
  // const inputDate = new Date(review?.createdAt as string);
  const [dRating, setDRating] = useState(0);
  const { address } = useAccount();
  const [decrypt, setDecrypt] = useState<null | string>(null);

  const options: {} = { day: 'numeric', month: 'long', year: 'numeric' };
  // const formattedDate = inputDate.toLocaleDateString('en-US', options);

  const { data: walletClient } = useWalletClient();
  const { showToast } = useAppToast();

  const decryptRating = async () => {
    console.log(review.rating, 'ck');

    if (!walletClient || !address || !review.rating) {
      showToast('Missing credentials', 'error');
      return;
    }

    try {
      const provider = new BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      setDecrypt('Rating decryping...');

      const rating = await requestUserDecryption(signer, review.rating);
      setDRating(rating);
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setDecrypt(null);
    }
  };

  return (
    <div className="pb-4 md:pb-8">
      <div className="flex gap-6 items-center">
        <Image
          width={80}
          height={80}
          src={review?.user?.profileImage ?? defaultImage}
          className="rounded-full"
          alt="review user"
        />
        {/* <div>
          <h2 className="font-bold capitalize text-xl lg:text-2xl tracking-wide text-gray-700">
            {review?.name ? review.name : review?.user?.username}
          </h2>
          <p className="text-lg text-green-500 font-medium pt-2">{formattedDate}</p>
        </div> */}
      </div>

      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 capitalize pt-4 md:pt-8">
        Review:-
      </h1>
      <p className="font-medium tracking-[1px] lg:max-w-[70%] text-gray-500 py-6 md:py-8">
        {review?.comment}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-[80%] lg:w-[70%]">
        {/* {reviewsLists.map((item, index) => (
          <div key={index} className="flex justify-between md:justify-start items-center gap-3">
            <h3 className="text-xl text-gray-600 tracking-widest">{item.name}</h3>

            <Rate className="text-green-400 ant-star" value={review?.ratings[index]} disabled />
          </div>
        ))} */}

        <Rate className="text-green-400 ant-star" value={dRating} disabled />
      </div>

      {dRating ? (
        <span className="text-green-500">{dRating} star</span>
      ) : (
        <Button
          type="dashed"
          onClick={decryptRating}
          size="middle"
          loading={decrypt ? true : false}
          disabled={typeof decrypt === 'string'}
          className="my-6 !bg-red-500"
        >
          <span className="text-white"> {decrypt ? decrypt : 'Reveal'}</span>
        </Button>
      )}

      <Divider />
    </div>
  );
};

export default ReviewCard;
