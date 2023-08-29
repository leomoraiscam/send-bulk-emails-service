import { IRegisterUserPayload } from './dtos/IRegisterUserPayload';
import { MissingParamError } from './errors/MissingParamError';
import { RegisterUser } from './RegisterUser';

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async handle(request: IRegisterUserPayload) {
    const response = await this.registerUser.execute(request);

    try {
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
    } catch (err) {
      return {
        status: 500,
        body: {
          data: err,
        },
      };
    }
  }
}
