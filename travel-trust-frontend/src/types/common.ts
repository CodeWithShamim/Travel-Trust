import { BookingStatus } from "@/constants/booking";
import { PAYMENT_ROLE } from "@/constants/role";

export interface IMeta {
  limit: number;
  page: number;
  total: number;
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
  createdAt?: string;
};

export type IService = {
  id: string;
  name: string;
  description: string;
  price: string | number;
  image: string;
  location: string;
  category: string;
  status: string;
};

export type IBooking = {
  id?: string;
  date: string;
  time: string;
  types: string;
  ticket: string;
  userId: string;
  serviceId: string;
  user?: IUser;
  service?: IService;
  status?: string;
};

export type IReview = {
  id?: string;
  name: string;
  email: string;
  reviewTitle: string;
  ratings: number[];
  comment: string;
  userId: string;
  serviceId: string;
  user?: IUser;
  service?: IService;
  createdAt?: string;
};

export type NotificationType = "service" | "booking" | "review" | "message";

export type INotification = {
  id?: string;
  userId?: string;
  type?: NotificationType;
  notificationDataId?: string;
  message: string;
  avatar: string;
  createdAt: string;
};

export type IMessage = {
  id?: string;
  senderId: string;
  receiver: string;
  content: string;
  createdAt: string;
};

export type ILocation = {
  latitude: number;
  longitude: number;
};

export type IPayment = {
  id?: string;
  amount: string;
  bookingId: string;
  currency?: string;
  transactionId?: string;
  paymentIntent?: string;
  paymentStatus?: PAYMENT_ROLE;
};

export type IPaymentModal = {
  bookingData: IBooking | null;
  setBookingData: (v: IBooking | null) => void;
};

export type IPaymentMethod = "stripe" | "sslcommerz";
