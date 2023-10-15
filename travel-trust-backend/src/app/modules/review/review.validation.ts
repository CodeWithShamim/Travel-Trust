import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required',
    }),
    serviceId: z.string({
      required_error: 'Service id is required',
    }),
    rating: z.number({
      required_error: 'Rating is required',
    }),
    comment: z.string({
      required_error: 'Comment is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string().optional(),
    rating: z.number().optional(),
    comment: z.string().optional(),
  }),
});

export const ReviewZodValidation = {
  create,
  update,
};
