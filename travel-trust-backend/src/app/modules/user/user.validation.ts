import { z } from 'zod';
// import { userRole } from '../../../constants/user';

const create = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
    }),
    profileImage: z.string({
      required_error: 'Profile image is required.',
    }),
    email: z.string({
      required_error: 'Email is required.',
    }),
    password: z.string({
      required_error: 'Password is required.',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required.',
    }),
    // role: z.enum([...userRole] as [string, ...string[]], {
    //   required_error: 'Role is required',
    // }),
    gender: z.string().optional(),
    age: z.number().optional(),
    address: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    username: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    // role: z.enum([...userRole] as [string, ...string[]]).optional(),
    gender: z.string().optional(),
    age: z.number().optional(),
    address: z.string().optional(),
  }),
});

export const UserZodValidation = {
  create,
  update,
};
