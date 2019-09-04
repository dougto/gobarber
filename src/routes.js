import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvaiableController from './app/controllers/AvaiableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

routes.get('/providers', authMiddleware, ProviderController.index);
routes.get(
  '/providers/:provider_id/avaiable',
  authMiddleware,
  AvaiableController.index
);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/appointments', authMiddleware, AppointmentController.store);
routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.delete(
  '/appointments/:id',
  authMiddleware,
  AppointmentController.delete
);

routes.get('/schedules', authMiddleware, ScheduleController.index);

routes.get('/notifications', authMiddleware, NotificationController.index);
routes.get('/notifications/:id', authMiddleware, NotificationController.update);

export default routes;
