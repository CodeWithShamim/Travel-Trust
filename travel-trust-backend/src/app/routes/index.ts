import express from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { ServiceRoute } from '../modules/service/service.route';
import { BookingRoute } from '../modules/booking/booking.route';
import { ReviewRoute } from '../modules/review/review.route';
import { NotificationRoute } from '../modules/notification/notification.route';
import { MessageRoute } from '../modules/message/message.route';
import { PaymentRoute } from '../modules/payment/payment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/service',
    route: ServiceRoute,
  },
  {
    path: '/booking',
    route: BookingRoute,
  },
  {
    path: '/review',
    route: ReviewRoute,
  },
  {
    path: '/notification',
    route: NotificationRoute,
  },
  {
    path: '/message',
    route: MessageRoute,
  },
  {
    path: '/payment',
    route: PaymentRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
