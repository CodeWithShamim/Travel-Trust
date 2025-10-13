'use client'

import { IService } from '@/types'
import Image from 'next/image'
import { Card, Rate, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCartOutlined } from '@ant-design/icons'
import colors from '@/constants/colors'
import { useAppDispatch, useAppSelector, useBlurDataURL } from '@/redux/hooks'
import { addServiceToCart } from '@/redux/slices/serviceSlice'
import { motion, useAnimation } from 'framer-motion'
import { fadeIn, slideIn, zoomIn } from '@/utils/motion'
import { dynamicBlurDataUrl } from '@/utils/base64'

const { Meta } = Card

interface ServiceCardProps {
  service: IService
  loading?: boolean
  index?: number
}

const ServiceCard = ({ service, loading, index = 0 }: ServiceCardProps) => {

  const { id, name, price, image, category, status } = service
  const cart = useAppSelector((state) => state.service.cart)
  const dispatch = useAppDispatch()
  const { blurDataURL, isLoading } = useBlurDataURL(image)

  const handleAddToCart = (type: 'add' | 'remove') => {
    if (cart.length >= 5 && type === 'add') {
      message.warning('Maximum cart size exists! total cart 5')
      return
    }

    dispatch(addServiceToCart(service))
  }

  const isExistOnCart = cart.some((item: { id: string }) => item?.id === id)

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={fadeIn('', 'scroll', index * 0.08, 0.5)}
      className="w-full mx-auto flex justify-center"
    >
      <Card
        className="w-full h-[200px] shadow custom-card"
        loading={loading}
        hoverable
      >
        <div
          onClick={() => handleAddToCart(isExistOnCart ? 'remove' : 'add')}
          className={`top-0 right-0 bg-primary z-20 text-white text-center absolute rounded-full w-8 h-8 ${
            isExistOnCart ? 'bg-[#ff3333]' : 'bg-[#FFD20A] '
          }`}
        >
          <Tooltip
            title={isExistOnCart ? 'Remove from cart' : 'Add to cart'}
            color={isExistOnCart ? '#ff3333' : colors.primary}
          >
            <ShoppingCartOutlined height={100} width={100} className="mt-2" />
          </Tooltip>
        </div>

        <Link href={`/service-details/${id}`} className="text-white h-full">
          {blurDataURL && (
            <Image
              src={image ?? require('@/assets/login.webp')}
              alt={name}
              fill
              quality={100}
              loading="lazy"
              objectFit="cover"
              className="mx-auto h-full w-full card-img pb-3 absolute inset-0"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          )}
          <h1 className="absolute z-40 text-white font-extrabold text-2xl text-left shadow-sm">
            {name}
          </h1>

          <div className="card-overlay absolute inset-0 w-full h-full bg-[#FFD20A] opacity-30 rounded-lg"></div>

          <div className="card-content flex gap-2 shadow-sm p-2">
            <p className=" font-bold">Category: {category}</p>
            <p className=" font-bold">Price: {price}$</p>
          </div>
        </Link>
      </Card>
    </motion.div>
  )
}

export default ServiceCard
