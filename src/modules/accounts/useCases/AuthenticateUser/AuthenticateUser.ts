import { JWT } from '@modules/accounts/entities';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { IHashProvider } from '../../../../infra/providers/HashProvider/models/IHashProvider';
import { IAuthenticateUserRequest } from './dtos/IAuthenticateUserPayload';
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError';

export class AuthenticateUser {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute(
    request: IAuthenticateUserRequest
  ): Promise<{ token: string } | Error> {
    let isPasswordValid = false;
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return new InvalidEmailOrPasswordError();
    }

    if (user.password.isHashedValue) {
      isPasswordValid = await this.hashProvider.compareHash(
        password,
        user.password.value
      );
    } else {
      isPasswordValid = password === user.password.value;
    }

    if (!isPasswordValid) {
      return new InvalidEmailOrPasswordError();
    }

    const { value: token } = JWT.signUser(user);

    return {
      token,
    };
  }
}
