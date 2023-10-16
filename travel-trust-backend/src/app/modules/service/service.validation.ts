import { z } from 'zod';
import { ServiceCategory, ServiceStatus } from './service.constant';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    location: z.string(),
    category: z.enum([...ServiceCategory] as [string, ...string[]]).optional(),
    status: z.enum([...ServiceStatus] as [string, ...string[]]).optional(),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    category: z.enum([...ServiceCategory] as [string, ...string[]]).optional(),
    status: z.enum([...ServiceStatus] as [string, ...string[]]).optional(),
  }),
});

export const ServiceZodValidation = {
  create,
  update,
};
