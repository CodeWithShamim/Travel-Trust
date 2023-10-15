import { z } from 'zod';
import { BookingStatus } from './booking.constant';

const create = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required',
    }),
    serviceId: z.string({
      required_error: 'Service id is required',
    }),
    date: z.string({
      required_error: 'Date is required',
    }),
    time: z.string({
      required_error: 'Time is required',
    }),
    status: z.enum([...BookingStatus] as [string, ...string[]]).optional(),
  }),
});

const update = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    status: z.enum([...BookingStatus] as [string, ...string[]]).optional(),
  }),
});

export const BookingZodValidation = {
  create,
  update,
};
