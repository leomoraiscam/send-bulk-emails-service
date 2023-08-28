import { IHashProvider } from 'infra/providers/HashProvider/models/IHashProvider';

import { Email, Name, Password, User } from '@modules/accounts/entities';
import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordLengthError,
} from '@modules/accounts/entities/errors';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IRegisterUserPayload } from './dtos/IRegisterUserPayload';
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';

export type RegisterUserResponse = Partial<IRegisterUserPayload>;

export class RegisterUser {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute(
    request: IRegisterUserPayload
  ): Promise<
    | RegisterUserResponse
    | InvalidNameError
    | InvalidEmailError
    | InvalidPasswordLengthError
  > {
    const { name, email, password } = request;

    const nameOrError = Name.create(name) as Name;

    if (nameOrError instanceof Error) {
      return new InvalidNameError(name);
    }

    const emailOrError = Email.create(email) as Email;

    if (emailOrError instanceof Error) {
      return new InvalidEmailError(email);
    }

    // const hashedPassword = await this.hashProvider.generateHash(password);

    const passwordOrError = Password.create(password, true) as Password;

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
