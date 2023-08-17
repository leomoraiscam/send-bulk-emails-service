import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import RegisterUser, {
  IRegisterUserRequest,
  RegisterUserResponse,
} from './RegisterUser';

class UsersRepository implements IUsersRepository {
  private repository: IRegisterUserRequest[] = [];

  constructor(repository: IRegisterUserRequest[]) {
    this.repository = repository;
  }

  async exists(email: string): Promise<boolean> {
    const user = this.repository.find((user) => user.email === email);

    if (!user) {
      return false;
    }

    return true;
  }
}

describe('Register User Use Case', () => {
  let usersRepository: IUsersRepository;

  it('should be able to register new user', async () => {
    usersRepository = new UsersRepository([]);
    const registerUser = new RegisterUser(usersRepository);

    const userData = {
      name: 'John Doe',
      email: 'john@email.com',
      password: 'test@1234',
    };

    const user = (await registerUser.execute({
      ...userData,
    })) as RegisterUserResponse;

    expect(user.name).toBe('John Doe');
  });

  it('should not be able to register new user with invalid data', async () => {
    usersRepository = new UsersRepository([]);
    const registerUser = new RegisterUser(usersRepository);

    const userData = {
      name: 'John Doe',
      email: 'john@email.com',
      password: 't1',
    };

    const response = await registerUser.execute({
      ...userData,
    });

    expect(response).toEqual('InvalidPasswordLengthError');
  });

  it('should not be able to register new user with existing email', async () => {
    const user = [
      {
        name: 'John Doe',
        email: 'john@email.com',
        password: '123456',
      },
    ];

    usersRepository = new UsersRepository(user);
    const registerUser = new RegisterUser(usersRepository);

    const { name, email, password } = {
      name: user[0].name,
      email: user[0].email,
      password: user[0].password,
    };

    expect(
      await registerUser.execute({
        name,
        email,
        password,
      })
    ).toBe('AccountAlreadyExistsError');
  });
});
