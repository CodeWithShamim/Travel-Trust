import { z } from 'zod';

const create = z.object({
  body: z.object({
    amount: z.string({
      required_error: 'Amount is required',
    }),
    bookingId: z.string({
      required_error: 'Booking id is required',
    }),

    transactionId: z.string().optional(),
    paymentStatus: z.string().optional(),
    paymentIntent: z.string().optional(),
    currency: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    amount: z.string().optional(),
    currency: z.string().optional(),
    transactionId: z.string().optional(),
    paymentIntent: z.string().optional(),
    paymentStatus: z.string().optional(),
    bookingId: z.string().optional(),
  }),
});

export const PaymentZodValidation = {
  create,
  update,
};
