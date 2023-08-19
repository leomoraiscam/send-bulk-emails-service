import Email from '@modules/accounts/entities/email';
import InvalidEmailError from '@modules/accounts/entities/errors/InvalidEmailError';
import InvalidNameError from '@modules/accounts/entities/errors/InvalidNameError';
import InvalidPasswordLengthError from '@modules/accounts/entities/errors/InvalidPasswordLengthError';
import Name from '@modules/accounts/entities/name';
import Password from '@modules/accounts/entities/password';
import User from '@modules/accounts/entities/user';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import AccountAlreadyExistsError from './errors/AccountAlreadyExistsError';

export interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export type RegisterUserResponse = Partial<IRegisterUserRequest>;

class RegisterUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    request: IRegisterUserRequest
  ): Promise<RegisterUserResponse | Error> {
    const { name, email, password } = request;

    const nameOrError = Name.create(name) as Name;

    if (nameOrError instanceof Error) {
      return new InvalidNameError(name);
    }

    const emailOrError = Email.create(email) as Email;

    if (emailOrError instanceof Error) {
      return new InvalidEmailError(email);
    }

    const passwordOrError = Password.create(password) as Password;

    if (passwordOrError instanceof Error) {
      return new InvalidPasswordLengthError();
    }

    const userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    });

    if (userOrError instanceof Error) {
      throw new Error(`User data is incorrect`);
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(
      userOrError.email.value
    );

    if (userAlreadyExists) {
      return new AccountAlreadyExistsError(userOrError.email.value);
    }

    await this.usersRepository.create(userOrError);

    return {
      name: userOrError.name.value,
      email: userOrError.email.value,
    };
  }
}

export default RegisterUser;
