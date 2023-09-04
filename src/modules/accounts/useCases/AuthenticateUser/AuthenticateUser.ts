import { Either, left, right } from '@core/logic/Either';
import { IHashProvider } from '@infra/providers/HashProvider/models/IHashProvider';
import { JWT } from '@modules/accounts/entities';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { IAuthenticateUserRequest } from './dtos/IAuthenticateUserPayload';
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError';

export class AuthenticateUser {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute(
    request: IAuthenticateUserRequest
  ): Promise<Either<InvalidEmailOrPasswordError, { token: string }>> {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidEmailOrPasswordError());
    }

    const isPasswordValid = await this.hashProvider.compareHash(
      password,
      user.password.value
    );

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const { value: token } = JWT.signUser(user);

    return right({ token });
  }
}
