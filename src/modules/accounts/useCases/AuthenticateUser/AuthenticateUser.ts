import { compare } from 'bcryptjs';

import JWT from '@modules/accounts/entities/jwt';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import InvalidEmailOrPasswordError from './errors/InvalidEmailOrPasswordError';

interface IAuthenticateUserRequest {
  email: string;
  password?: string;
}

class AuthenticateUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    request: IAuthenticateUserRequest
  ): Promise<{ token: string } | string> {
    let isPasswordValid = false;
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      const { name } = new InvalidEmailOrPasswordError();

      return name;
    }

    if (user.password.isHashedValue) {
      isPasswordValid = await compare(password, user.password.value);
    } else {
      isPasswordValid = password === user.password.value;
    }

    if (isPasswordValid === false) {
      const { name } = new InvalidEmailOrPasswordError();

      return name;
    }

    const { value: token } = JWT.signUser(user);

    return {
      token,
    };
  }
}

export default AuthenticateUser;
