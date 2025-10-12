'use client'

import { TravelCategory, TravelDestinations } from '@/constants/service'
import { Button, Input, Select } from 'antd'
import React, { useState } from 'react'
import { DownCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addSearchData } from '@/redux/slices/serviceSlice'
import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
  const [from, setFrom] = useState<string>('')
  const [destination, setDestination] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { dictionaries } = useAppSelector((state) => state.i18n)
  const searchBar = dictionaries?.home?.searchBar

  const handleSearchService = () => {
    setSearchLoading(true)
    const data = {
      from,
      destination,
      category,
    }

    if (from || destination || category) {
      dispatch(addSearchData(data))
      router.push('/service/search')
    }

    setFrom('')
    setDestination(null)
    setCategory(null)
    setTimeout(() => setSearchLoading(false), 1000)
  }

  return (
    <div className="z-50 hidden md:block w-full mx-auto backdrop-blur-md bg-white/10 p-5">
      <div className="flex items-center justify-center bg-white w-full py-6 relative shadow-2xl">
        <div className="w-full">
          <Input
            placeholder={searchBar?.from}
            type="text"
            allowClear
            bordered={false}
            style={{ width: '22%' }}
            className="text-black custom-input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <Select
            placeholder={searchBar?.destination}
            bordered={false}
            style={{ width: '22%', color: '#000' }}
            onChange={(value) => setDestination(value)}
            className="text-black custom-select"
            value={destination}
            suffixIcon={<DownCircleOutlined />}
            options={TravelDestinations.map((province: string) => ({
              label: province,
              value: province,
            }))}
          />
          <Select
            placeholder={searchBar?.category}
            bordered={false}
            style={{ width: '22%', color: '#000' }}
            onChange={(value) => setCategory(value)}
            className="text-black custom-select"
            value={category}
            suffixIcon={<DownCircleOutlined />}
            options={TravelCategory.map((province: string) => ({
              label: province,
              value: province,
            }))}
          />
        </div>

        <Button
          className="!absolute !right-0 !top-0 !bottom-0 !h-full flex items-center justify-center gap-1 "
          type="primary"
          style={{
            width: '22%',
            borderRadius: '0px',
          }}
          loading={searchLoading}
          onClick={handleSearchService}
        >
          <BiSearch size={24} className="text-[#303030]" />
          <span className="font-semibold text-lg text-[#303030] hover:text-white">
            {searchBar?.buttonText}
          </span>
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
