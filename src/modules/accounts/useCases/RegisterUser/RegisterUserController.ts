import {
  clientError,
  conflict,
  created,
  fail,
  HttpResponse,
} from '@core/infra/HttpResponse';

import { IRegisterUserPayload } from './dtos/IRegisterUserPayload';
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';
import { MissingParamError } from './errors/MissingParamError';
import { RegisterUser } from './RegisterUser';

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async handle(request: IRegisterUserPayload): Promise<HttpResponse> {
    const response = await this.registerUser.execute(request);

    try {
      const { name, email } = request;

      if (!name || !email) {
        let missing = !request.name ? 'name ' : '';

        missing += !request.email ? 'email' : '';

        return clientError(new MissingParamError(missing.trim()));
      }

      if (response.isLeft()) {
        const error = response.value;

        switch (error.name) {
          case AccountAlreadyExistsError.name:
            return conflict(error);
          default:
            return clientError(error);
        }
      } else {
        return created();
      }
    } catch (err) {
      return fail(err);
    }
  }
}
