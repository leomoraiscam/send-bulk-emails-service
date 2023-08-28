import { IRegisterUserPayload } from './dtos/IRegisterUserPayload';
import { RegisterUser } from './RegisterUser';

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async handle(request: IRegisterUserPayload) {
    const response = await this.registerUser.execute(request);

    return {
      status: 201,
      body: {
        name: request.name,
        email: request.email,
      },
    };
  }
}
