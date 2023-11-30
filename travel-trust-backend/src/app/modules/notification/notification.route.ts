import express, { Router } from 'express';
import { NotifactionController } from './notification.controller';

const router: Router = express.Router();

router.get('/', NotifactionController.getAllNotification);

export const NotificationRoute = router;
