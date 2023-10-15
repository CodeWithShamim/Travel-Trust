import express from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoute } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/login',
    route: AuthRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
