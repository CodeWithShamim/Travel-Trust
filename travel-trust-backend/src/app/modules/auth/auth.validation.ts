import { z } from 'zod';

const login = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is requried',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const AuthZodValidation = {
  login,
};
