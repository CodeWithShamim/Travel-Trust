'use client'
import { useParams, useRouter } from 'next/navigation'

import { IBooking, ILocation, IReview, IService } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Divider,
  FloatButton,
  Input,
  Pagination,
  PaginationProps,
  Rate,
  Select,
  TimePicker,
  message,
} from 'antd'
import {
  useGetAllServiceQuery,
  useGetSingleServiceQuery,
} from '@/redux/api/serviceApi'
import { getCoordinates, getTimeAndDate, timeAgo } from '@/utils/common'
import { getUserInfo } from '@/helpers/persist/user.persist'
import { useCreatebookingMutation } from '@/redux/api/bookingApi'
import Loader from '@/components/ui/Loader'
import { useAppSelector } from '@/redux/hooks'
import {
  useCreateReviewMutation,
  useGetAllReviewQuery,
} from '@/redux/api/reviewApi'

import { BiSolidTimeFive } from 'react-icons/bi'
import { ShareAltOutlined } from '@ant-design/icons'
import { TravelCategory } from '@/constants/service'
import CustomSelect from '@/components/ui/CustomSelect'
import { motion } from 'framer-motion'
import { imageVariants } from '@/utils/motion'
import FormInput from '@/components/forms/FormInput'
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'
import Form from '@/components/forms/Form'
import { reviewsLists, serviceDetailsLists } from '@/data/service'
import ReviewCard from '@/components/ui/ReviewCard'
import MouseScroll from '@/components/common/MouseScroll'
import Link from 'next/link'
import { AiFillMessage } from 'react-icons/ai'
import ShareButton from '@/components/ui/ShareService'
import ShareService from '@/components/ui/ShareService'
import MapView from '@/components/ui/MapView'
import ServiceCard from '@/components/ui/ServiceCard'
import PaymentModal from '@/components/common/PaymentModal'

const { TextArea } = Input

interface IServiceProps {
  service: IService
}

const ServiceDetails = ({ service }: IServiceProps) => {
  const query: any = {}

  const params = useParams()
  const id = params?.id

  const [createBooking, { isLoading: bookingCreateLoading }] =
    useCreatebookingMutation()
  const [createReview, { isLoading: addReviewLoading }] =
    useCreateReviewMutation()

  const serviceQuery: any = {}
  serviceQuery['limit'] = 4
  serviceQuery['sortOrder'] = 'asc'
  const { data: suggestedService, isLoading: serviceLoading } =
    useGetAllServiceQuery({
      ...serviceQuery,
    })

  const [ratings, setRatings] = useState<number[]>([5, 3, 4, 5, 5])
  const [types, setTypes] = useState<string>('')
  const [ticket, setTicket] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(2)

  const [isShareService, setIsShareService] = useState<boolean>(false)
  const [coordinate, setCoordinate] = useState<ILocation>()
  const [bookingData, setBookingData] = useState<IBooking | null>(null)

  query['serviceId'] = id
  query['page'] = currentPage
  query['limit'] = limit
  const { data: reviewsData, isLoading: reviewLoading } = useGetAllReviewQuery({
    ...query,
  })

  const user = useAppSelector((state) => state.user?.data) as any
  const router = useRouter()

  // add service booking
  const handleServiceBooking = async () => {
    if (!user?.id) {
      router.push('/login')
      return
    }

    if (!date || !time || !ticket || !types) {
      return
    }

    // const { date, time } = getTimeAndDate();
    const data: IBooking = {
      date,
      time,
      types,
      ticket,
      userId: user?.id,
      serviceId: id as string,
    }

    try {
      const res: any = await createBooking(data)
      if (res?.data?.id) {
        message.success('Booking created successfully.')
        // router?.push("/dashboard/user/bookings");
        setBookingData(res?.data)
      }
    } catch (error) {
      message.error('Failed to booking.')
    }
  }

  // add review
  const handleAddReview: SubmitHandler<any> = async (data: any, reset: any) => {
    const reviewData: IReview = {
      ...data,
      name: user?.username ?? data?.name,
      email: user?.email ?? data?.email,
      ratings: ratings,
      userId: user?.id ?? undefined,
      serviceId: id as string,
    }

    try {
      const res: any = await createReview(reviewData)
      if (res?.data?.id) {
        message.success('Review added successfully.')
      }
      if (res?.error) {
        message.error(res.error?.data?.message)
      }
    } catch (error) {
      message.error('Failed to add review.')
    } finally {
      reset()
    }
  }

  const handleRateChange = (value: number, index: number) => {
    const newRatings = [...ratings]
    newRatings[index] = value
    setRatings(newRatings)
  }

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const handleGetCoordinate = async () => {
      const res: any = await getCoordinates(service?.location)
      if (res) {
        setCoordinate(res)
      }
    }

    service?.location && handleGetCoordinate()
  }, [service])

  return (
    <>
      {service?.id ? (
        <div className="">
          <Link href={'/message'}>
            <FloatButton
              shape="circle"
              type="primary"
              style={{ right: 10, bottom: 10 }}
              icon={<AiFillMessage size={22} />}
            />
          </Link>

          <div>
            <PaymentModal
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial="hidden"
              animate="show"
              variants={imageVariants()}
              className=""
            >
              <Image
                src={service?.image}
                alt={service?.name}
                width={1300}
                height={300}
                className="h-[35rem] w-full object-cover"
                quality={100}
                priority
              />

              <div>
                <MouseScroll />
              </div>
            </motion.div>
          </div>

          {service?.status === 'upcoming' && (
            <div className="absolute inset-x-0 top-1/4 m-auto text-center h-32]">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-green-400 text-center capitalize">
                {service?.status}
              </h1>
            </div>
          )}

          {/* header details content  */}
          <section>
            <div className="bg-green-100 flex items-center justify-center w-full md:mt-[-10px] py-16 md:py-20 lg:py-24">
              <div className="max-w-[1200px] w-full mx-auto px-4 flex flex-col items-start justify-center md:flex-row  md:justify-between md:items-center">
                <div className="pb-6 md:pb-0">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-widest">
                    {service?.name}
                  </h1>
                  <p>
                    <span className="text-xl text-green-400 font-extrabold tracking-widest">
                      ${service?.price}
                    </span>{' '}
                    /{' '}
                    <span className="text-gray-500 tracking-widest">
                      Per person
                    </span>
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                  {serviceDetailsLists(service)?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="hover:scale-125 transition-all">
                        {item.icon}
                      </div>
                      <div>
                        <h2 className="text-gray-600 font-mono tracking-wide">
                          {item.title}
                        </h2>
                        <p className="text-xl lg:text-2xl md:tracking-widest">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-[1200px] w-full mx-auto px-4 flex items-center justify-between py-6">
              <span className="flex items-center gap-3">
                <BiSolidTimeFive size={16} color="#FFD20A" />
                <p>Posted {timeAgo(service?.createdAt)}</p>
              </span>
              <span>
                <Button
                  onClick={() => setIsShareService(true)}
                  type="primary"
                  size="small"
                  icon={<ShareAltOutlined />}
                >
                  Share
                </Button>
              </span>

              <ShareService
                id={id as string}
                isShareService={isShareService}
                setIsShareService={setIsShareService}
              />
            </div>
            <Divider className="text-gray-400" />
          </section>

          {/* overview  */}
          <section className="max-w-[1200px] w-full mx-auto px-4 pb-8 md:py-12 lg:py-16">
            <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-8 lg:gap-10">
              <div className="w-full md:basis-3/5">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-widest">
                  Overview
                </h1>
                <p className="font-medium tracking-[1px] text-gray-500 py-4 md:py-8">
                  {service?.description}
                </p>
              </div>

              <div className="bg-green-100 w-full lg:h-[450px] md:basis-4/12 p-4 md:p-8 rounded-md flex flex-col gap-4">
                <h1 className="text-lg font-bold tracking-widest">
                  Booking Tour
                </h1>

                <CustomSelect
                  placeholder="Type"
                  onChange={setTypes}
                  value={types ? types : null}
                  optionsValue={TravelCategory}
                />
                <DatePicker
                  format="YYYY-MM-DD"
                  className="text-black custom-picker bg-white border-none w-full py-5 rounded-xl"
                  onChange={(date, currentDate) => setDate(currentDate)}
                  inputReadOnly
                />
                <TimePicker
                  className="text-black custom-picker bg-white border-none w-full py-5 rounded-xl"
                  onChange={(
                    time: any,
                    currentTime: React.SetStateAction<string>
                  ) => setTime(currentTime)}
                  inputReadOnly
                />
                <CustomSelect
                  placeholder="Choose Ticket"
                  onChange={setTicket}
                  value={ticket ? ticket : null}
                  optionsValue={TravelCategory}
                />

                {user?.id ? (
                  <Button
                    type="primary"
                    onClick={handleServiceBooking}
                    disabled={service?.status === 'upcoming' || !user?.id}
                    loading={bookingCreateLoading}
                    className="w-full"
                    size="large"
                  >
                    <span className="text-xl font-bold">Booking Now</span>
                  </Button>
                ) : (
                  <Link href={'/login'}>
                    <Button
                      type="primary"
                      ghost
                      className="w-full"
                      size="large"
                    >
                      <span className="font-bold text-red-500 capitalize">
                        Please login for booking
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </section>

          {/* maps  */}
          <section>
            <div className="max-w-[1200px] px-4 mx-auto rounded-xl">
              {coordinate && <MapView zoom={11} location={coordinate} />}
            </div>
          </section>

          {/* show review  */}
          <section className="max-w-[1200px] mx-auto px-4 pt-8 md:pt-12 lg:pt-14">
            <Divider type="vertical" className="text-black h-full" />
            <div className="w-full lg:w-[80%]">
              {reviewsData?.reviews?.map((review: IReview) => (
                <ReviewCard review={review} key={review?.id} />
              ))}
            </div>
            <div className="w-full lg:w-[80%]">
              {Number(reviewsData?.meta?.total) > 0 ? (
                <Pagination
                  current={currentPage}
                  onChange={onChange}
                  total={reviewsData?.meta?.total}
                  defaultPageSize={limit}
                  responsive
                />
              ) : null}
            </div>
          </section>

          {/* add review  */}
          <section className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold pb-4">
              Write a Review
            </h1>
            <div className="w-full lg:w-[80%]">
              <Form submitHandler={handleAddReview}>
                <div className="flex flex-col-reverse md:flex-row py-5 gap-5">
                  <div className="flex flex-col gap-2 md:w-[60%]">
                    <span className="bg-green-100">
                      <FormInput
                        name="name"
                        placeholder="Name"
                        type="text"
                        size="large"
                        value={user?.username}
                        disabled={user?.username}
                        isStyles
                      />
                    </span>
                    <span className="bg-green-100">
                      <FormInput
                        name="email"
                        placeholder="Email"
                        type="email"
                        size="large"
                        value={user?.email}
                        disabled={user?.email}
                        isStyles
                      />
                    </span>

                    <FormInput
                      name="reviewTitle"
                      placeholder="Review Title"
                      type="text"
                      size="large"
                      isStyles
                    />
                  </div>

                  <div className="flex flex-col gap-3 w-full md:w-[40%]">
                    {reviewsLists.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between md:px-10"
                      >
                        <p className="text-xl md:text-2xl text-gray-600 md:tracking-widest">
                          {item.name}
                        </p>
                        <Rate
                          className="text-green-400 ant-star custom-rate"
                          value={ratings[index]}
                          onChange={(value) => handleRateChange(value, index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Controller
                  name="comment"
                  render={({ field }) => (
                    <TextArea
                      rows={5}
                      placeholder="Write comment..."
                      className="custom-placeholder text-black"
                      {...field}
                    />
                  )}
                />

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={addReviewLoading}
                  disabled={service?.status === 'upcoming'}
                  className="my-6"
                >
                  <span className="font-bold text-xl uppercase">
                    Submit Review
                  </span>
                </Button>
              </Form>
            </div>
          </section>

          {/* Related service  */}
          <section className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
            <h1 className="font-bold text-3xl md:uppercase text-[#FFD20A] tracking-widest">
              Suggested for you
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-4 md:py-6 lg:py-10">
              {(suggestedService as any)?.services?.map(
                (service: IService, index: number) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    // loading={isLoading}
                    index={index}
                  />
                )
              )}
            </div>
          </section>
        </div>
      ) : (
        <h1 className="text-red-400 font-bold text-center mt-20">
          Service not found by this id!
        </h1>
      )}
    </>
  )
}

export default ServiceDetails
