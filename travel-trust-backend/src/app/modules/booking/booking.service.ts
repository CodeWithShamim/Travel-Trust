import { Booking } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import handleFilters from '../../../shared/handleFilters';
import { IFilters } from './booking.interface';
import { BookingSearchableFields } from './booking.constant';

const createBooking = async (data: Booking): Promise<Booking> => {
  const Booking = await prisma.booking.create({
    data,
    include: {
      user: true,
      service: true,
    },
  });
  return Booking;
};

const getAllBooking = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const whereConditions = handleFilters(filters, BookingSearchableFields);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.booking.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      user: true,
      service: true,
    },
  });

  const total = await prisma.booking.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const updateBooking = async (
  id: string,
  data: Partial<Booking>
): Promise<Booking> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data,
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const deleteBooking = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

export const BookingService = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
