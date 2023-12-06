import { z } from 'zod';

const create = z.object({
  body: z.object({
    amount: z.string({
      required_error: 'Amount is required',
    }),
    currency: z.string({
      required_error: 'Currency is required',
    }),
    paymentIntent: z.string({
      required_error: 'Payment intent is required',
    }),
    transactionId: z.string().optional(),
    paymentStatus: z.string().optional(),
    bookingId: z.string({
      required_error: 'Booking id is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    amount: z.string().optional(),
    currency: z.string().optional(),
    paymentIntent: z.string().optional(),
    transactionId: z.string().optional(),
    paymentStatus: z.string().optional(),
    bookingId: z.string().optional(),
  }),
});

export const PaymentZodValidation = {
  create,
  update,
};
