import { Either, left, right } from '@core/logic/Either';
import { IHashProvider } from '@infra/providers/HashProvider/models/IHashProvider';
import { Email, Name, Password, User } from '@modules/accounts/entities';
import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordLengthError,
} from '@modules/accounts/entities/errors';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IRegisterUserPayload } from './dtos/IRegisterUserPayload';
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';

export class RegisterUser {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute(
    request: IRegisterUserPayload
  ): Promise<
    Either<
      | AccountAlreadyExistsError
      | InvalidNameError
      | InvalidEmailError
      | InvalidPasswordLengthError,
      User
    >
  > {
    const { name, email, password } = request;

    const nameOrError = Name.create(name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    const emailOrError = Email.create(email);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const passwordOrError = Password.create(hashedPassword, true);

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const userOrError = User.create({
      name: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email.value
    );

    if (userAlreadyExists) {
      return left(new AccountAlreadyExistsError(user.email.value));
    }

    await this.usersRepository.create(user);

    return right(user);
  }
}
