import { Review } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import handleFilters from '../../../shared/handleFilters';
import { IFilters } from './review.interface';
import { ReviewSearchableFields } from './review.constant';

const createReview = async (data: Review): Promise<Review> => {
  const Review = await prisma.review.create({
    data,
    include: {
      user: true,
      service: true,
    },
  });
  return Review;
};

const getAllReview = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Review[]>> => {
  const whereConditions = handleFilters(filters, ReviewSearchableFields);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.review.findMany({
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

  const total = await prisma.review.count({
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

const getSingleReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
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

const updateReview = async (
  id: string,
  data: Partial<Review>
): Promise<Review> => {
  const result = await prisma.review.update({
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

const deleteReview = async (id: string): Promise<Review> => {
  const result = await prisma.review.delete({
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

export const ReviewService = {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
