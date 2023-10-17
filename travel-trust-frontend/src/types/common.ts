export interface IMeta {
  limit: number;
  page: number;
  size: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  contactNo: string;
  profileImage: string;
  role: "user" | "admin" | "super_admin";
  gender?: string;
  address?: string;
  age?: number;
};
