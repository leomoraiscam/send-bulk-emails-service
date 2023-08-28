import express from 'express';

import { adaptRoute } from '../adapters/express-route-adapt';
import { makeRegisterUserController } from '../factories/controllers/RegisterUserControllerFactory';

const usersRouter = express.Router();

usersRouter.post('/', adaptRoute(makeRegisterUserController()));

export { usersRouter };
