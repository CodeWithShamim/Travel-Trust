import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string({
      required_error: 'Service id is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    reviewTitle: z.string({
      required_error: 'Review title is required',
    }),
    ratings: z.array(
      z.number({
        required_error: 'Ratings is required',
      })
    ),
    comment: z.string({
      required_error: 'Comment is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    reviewTitle: z.string().optional(),
    ratings: z.array(z.number()).optional(),
    comment: z.string().optional(),
  }),
});

export const ReviewZodValidation = {
  create,
  update,
};
