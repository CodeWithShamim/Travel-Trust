import { Booking } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import handleFilters from '../../../shared/handleFilters';
import { IFilters } from './booking.interface';
import { BookingSearchableFields } from './booking.constant';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../../enums/user';

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
  options: IPaginationOptions,
  user: JwtPayload | null
): Promise<IGenericResponse<Booking[]>> => {
  const whereConditions = handleFilters(filters, BookingSearchableFields);
  const isUser = user?.role === ENUM_USER_ROLE.USER;
  const where = isUser
    ? { ...whereConditions, userId: user?.id }
    : whereConditions;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.booking.findMany({
    where,
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

const getSingleBooking = async (
  id: string,
  user: JwtPayload | null
): Promise<Booking | null> => {
  const isUser = user?.role === ENUM_USER_ROLE.USER;
  const where = isUser ? { id, userId: user?.id } : { id };

  const result = await prisma.booking.findUnique({
    where,
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const updateBooking = async (
  id: string,
  data: Partial<Booking>,
  user: JwtPayload | null
): Promise<Booking> => {
  const isUser = user?.role === ENUM_USER_ROLE.USER;

  const where = isUser ? { id, userId: user?.id } : { id };

  const result = await prisma.booking.update({
    where,
    data,
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const deleteBooking = async (
  id: string,
  user: JwtPayload | null
): Promise<Booking> => {
  const isUser = user?.role === ENUM_USER_ROLE.USER;
  const where = isUser ? { id, userId: user?.id } : { id };

  const result = await prisma.booking.delete({
    where,
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
