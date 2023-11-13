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
    types: z.string({
      required_error: 'Types is required',
    }),
    ticket: z.string({
      required_error: 'Ticket is required',
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
    types: z.string().optional(),
    ticket: z.string().optional(),
    status: z.enum([...BookingStatus] as [string, ...string[]]).optional(),
  }),
});

const updateStatuses = z.object({
  body: z.object({
    statuses: z.array(
      z.object({
        id: z.string(),
        value: z.string(),
      })
    ),
  }),
});

export const BookingZodValidation = {
  create,
  update,
  updateStatuses,
};
