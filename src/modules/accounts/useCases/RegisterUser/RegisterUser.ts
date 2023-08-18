// eslint-disable-next-line max-classes-per-file
import Email, { InvalidEmailError } from '@modules/accounts/entities/email';
import Name, { InvalidNameError } from '@modules/accounts/entities/name';
import Password, {
  InvalidPasswordLengthError,
} from '@modules/accounts/entities/password';
import User from '@modules/accounts/entities/user';

import { IUsersRepository } from '../../repositories/IUsersRepository';

export interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export class AccountAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`The email "${email}" is already registered.`);
    this.name = 'AccountAlreadyExistsError';
  }
}

export type RegisterUserResponse = Partial<IRegisterUserRequest>;

class RegisterUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    request: IRegisterUserRequest
  ): Promise<RegisterUserResponse | string> {
    const { name, email, password } = request;

    const nameOrError = Name.create(name) as Name;

    if (nameOrError instanceof Error) {
      const { name: errorName } = new InvalidNameError(name);

      return errorName;
    }

    const emailOrError = Email.create(email) as Email;

    if (emailOrError instanceof Error) {
      const { name } = new InvalidEmailError(email);

      return name;
    }

    const passwordOrError = Password.create(password) as Password;

    if (typeof passwordOrError === 'string') {
      const { name } = new InvalidPasswordLengthError();

      return name;
    }

    const userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    });

    if (userOrError instanceof Error) {
      throw new Error(`User data is incorrect`);
    }

    const userAlreadyExists = await this.usersRepository.exists(
      userOrError.email.value
    );

    if (userAlreadyExists) {
      return new AccountAlreadyExistsError(userOrError.email.value).name;
    }

    // TODO: criar o metodo save

    // TODO:  fim do metodo save

    return {
      name: userOrError.name.value,
      email: userOrError.email.value,
    };
  }
}

export default RegisterUser;
