import { Request, Response } from 'express';

import { RegisterUserController } from '@modules/accounts/useCases/RegisterUser/RegisterUserController';

export const adaptRoute = (controller: RegisterUserController) => {
  return async (request: Request, response: Response) => {
    const { name, email, password } = request.body;

    const httpResponse = await controller.handle({ name, email, password });

    return response.status(httpResponse.status).json(httpResponse);
  };
};
