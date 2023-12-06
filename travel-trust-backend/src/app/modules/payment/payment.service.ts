import { Payment } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import handleFilters from '../../../shared/handleFilters';
import { IFilters } from './payment.interface';
import { PaymentSearchableFields } from './payment.constant';
import stripe from 'stripe';
import config from '../../../config';
const stripeInstance = new stripe(config.stripe_secret_key as string);

// create payment intent & get client secret
const createPaymentIntent = async (data: Payment): Promise<string | null> => {
  const { amount, currency, bookingId } = data;

  const clientSecret = await prisma.$transaction(async tx => {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Number(amount),
      currency,
      description: bookingId,
    });

    await tx.payment.create({
      data,
    });

    return paymentIntent.client_secret;
  });

  return clientSecret;
};

const getAllPayment = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Payment[]>> => {
  const whereConditions = handleFilters(filters, PaymentSearchableFields);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.payment.findMany({
    where: { ...whereConditions },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      booking: {
        include: {
          service: true,
          user: true,
        },
      },
    },
  });

  const total = await prisma.payment.count({
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

const getSinglePayment = async (id: string): Promise<Payment | null> => {
  const result = await prisma.payment.findUnique({
    where: {
      id,
    },
    include: {
      booking: {
        include: {
          service: true,
          user: true,
        },
      },
    },
  });
  return result;
};

const updatePayment = async (
  id: string,
  data: Partial<Payment>
): Promise<Payment> => {
  const result = await prisma.payment.update({
    where: {
      id,
    },
    data,
    include: {
      booking: {
        include: {
          service: true,
          user: true,
        },
      },
    },
  });

  return result;
};

const deletePayment = async (id: string): Promise<Payment> => {
  const result = await prisma.payment.delete({
    where: {
      id,
    },
    include: {
      booking: {
        include: {
          service: true,
          user: true,
        },
      },
    },
  });

  return result;
};

export const PaymentService = {
  createPaymentIntent,
  getAllPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
