import express from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { ServiceRoute } from '../modules/service/service.route';
import { BookingRoute } from '../modules/booking/booking.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
