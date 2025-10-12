import { Skeleton } from 'antd'
import React from 'react'

const ServiceCardSkeleton = () => {
  return (
    <div className="py-6">
      <Skeleton.Button active className="!w-full !h-[160px]" />
      <Skeleton.Button active className="!w-full" />
    </div>
  )
}

export default ServiceCardSkeleton
