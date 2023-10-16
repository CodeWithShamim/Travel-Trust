import { ENUM_USER_ROLE } from '../../../enums/user';

export type IFilters = {
  serviceId?: string;
  userId?: string;
  date?: string;
  time?: string;
  status?: string;
  searchTerm?: string;
};

export type IJWTUser = {
  id: string;
  role: ENUM_USER_ROLE;
  iat: number;
  exp: number;
};
