import express, { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserZodValidation } from './user.validation';
const router: Router = express.Router();

router.post(
  '/',
  validateRequest(UserZodValidation.create),
  UserController.createUser
);

router.get(
  '/',
  auth(ENUM_USER_ROLE?.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUser
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.getSingleUser
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(UserZodValidation.update),
  UserController.updateUser
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.deleteUser
);

router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserZodValidation.create),
  UserController.createAdmin
);

router.delete(
  '/delete-admin/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.deleteAdmin
);

router.post(
  '/user-to-admin',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserZodValidation.updateForAdmin),
  UserController.updateUserToAdmin
);

router.post(
  '/admin-to-super-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserZodValidation.updateForAdmin),
  UserController.updateAdminToSuperAdmin
);

export const UserRoute = router;
