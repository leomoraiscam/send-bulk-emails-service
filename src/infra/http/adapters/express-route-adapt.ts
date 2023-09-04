import { Request, Response } from 'express';

export const adaptRoute = (controller: any) => {
  return async (request: Request, response: Response) => {
    const { name, email, password } = request.body;

    const httpResponse = await controller.handle({ name, email, password });

    return response.status(httpResponse.status).json(httpResponse);
  };
};
