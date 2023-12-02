import { z } from 'zod';

const create = z.object({
  body: z.object({
    senderId: z.string({
      required_error: 'Sender id is required',
    }),
    receiverId: z.string({
      required_error: 'Receiver id is required',
    }),
    content: z.string({
      required_error: 'Content id is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    senderId: z.string().optional(),
    receiverId: z.string().optional(),
    content: z.number().optional(),
  }),
});

export const MessageZodValidation = {
  create,
  update,
};
