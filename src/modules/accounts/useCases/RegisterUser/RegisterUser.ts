import Email from '@modules/accounts/entities/email';
import Name from '@modules/accounts/entities/name';
import Password from '@modules/accounts/entities/password';
import User from '@modules/accounts/entities/user';

interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterUserResponse = Partial<IRegisterUserRequest>;

class RegisterUser {
  async execute(request: IRegisterUserRequest): Promise<RegisterUserResponse> {
    const { name, email, password } = request;

    const nameOrError = Name.create(name) as Name;

    const emailOrError = Email.create(email);

    const passwordOrError = Password.create(password);

    const userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    }) as User;

    return {
      name: userOrError.name.value,
      email: userOrError.email.value,
    };
  }
}

export default RegisterUser;
