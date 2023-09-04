import express from 'express';

import { adaptRoute } from '../adapters/express-route-adapt';
import { makeAuthenticateUserController } from '../factories/controllers/AuthenticateUserControllerFactory';
import { makeRegisterUserController } from '../factories/controllers/RegisterUserControllerFactory';

const usersRouter = express.Router();

usersRouter.post('/', adaptRoute(makeRegisterUserController()));
usersRouter.post('/sessions', adaptRoute(makeAuthenticateUserController()));

export { usersRouter };
