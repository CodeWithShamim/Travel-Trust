import express from 'express';
import { StudentRoute } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/student',
    route: StudentRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
