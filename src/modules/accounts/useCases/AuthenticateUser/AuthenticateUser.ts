import { compare } from 'bcryptjs';

import JWT from '@modules/accounts/entities/jwt';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { IAuthenticateUserRequest } from './dtos/IAuthenticateUserPayload';
import InvalidEmailOrPasswordError from './errors/InvalidEmailOrPasswordError';

class AuthenticateUser {
  constructor(private usersRepository: IUsersRepository) {}

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
      isPasswordValid = await compare(password, user.password.value);
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

export default AuthenticateUser;
