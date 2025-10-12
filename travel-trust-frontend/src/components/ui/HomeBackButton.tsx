import { Divider } from 'antd'
import Link from 'next/link'
import React from 'react'
import { BiArrowFromRight } from 'react-icons/bi'

const HomeBackButton = ({ isDivider = true }: { isDivider?: boolean }) => {
  return (
    <Link
      href="/"
      className="text-lg md:text-xl text-center lg:text-2xl font-extrabold shadow-2xl uppercase text-[#FFD20A] z-50"
    >
      Travel Trust
      {isDivider && <Divider />}
    </Link>
  )
}

export default HomeBackButton
