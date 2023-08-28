// eslint-disable-next-line max-classes-per-file
import { IRegisterUserPayload } from './dtos/IRegisterUserPayload';
import { RegisterUser } from './RegisterUser';

export class MissingParamError extends Error {
  public readonly name = 'MissingParamError';

  constructor(param: string) {
    super(`Missing parameter from request: ${param}.`);
  }
}

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async handle(request: IRegisterUserPayload) {
    const response = await this.registerUser.execute(request);

    if (!request.name || !request.email) {
      let missing = !request.name ? 'name ' : '';

      missing += !request.email ? 'email' : '';

      return {
        status: 400,
        body: {
          data: new MissingParamError(missing.trim()),
        },
      };
    }

    if (response instanceof Error) {
      return {
        status: 400,
        body: {
          data: response.name,
        },
      };
    }

    return {
      status: 201,
      body: {
        name: request.name,
        email: request.email,
      },
    };
  }
}