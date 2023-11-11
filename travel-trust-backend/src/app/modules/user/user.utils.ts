/* eslint-disable @typescript-eslint/no-explicit-any */

import bcrypt from 'bcrypt';
import config from '../../../config';

export const returnUserValue = (user: any) => {
  // delete user.role;
  delete user.password;
  return user;
};

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));
  return hash;
};
