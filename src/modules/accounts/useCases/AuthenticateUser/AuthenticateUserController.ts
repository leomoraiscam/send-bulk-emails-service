import { HttpResponse, ok, fail, clientError } from '@core/infra/HttpResponse';

import { AuthenticateUser } from './AuthenticateUser';
import { IAuthenticateUserRequest } from './dtos/IAuthenticateUserPayload';

export class AuthenticateUserController {
  constructor(private authenticateUser: AuthenticateUser) {}

  async handle({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<HttpResponse> {
    try {
      const result = await this.authenticateUser.execute({
        email,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;

        return clientError(error);
      }

      const { token } = result.value;

      return ok({ token });
    } catch (err) {
      return fail(err);
    }
  }
}
