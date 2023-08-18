import Email from '@modules/accounts/entities/email';
import Name from '@modules/accounts/entities/name';
import Password from '@modules/accounts/entities/password';
import User from '@modules/accounts/entities/user';

import InMemoryUsersRepository from '../../repositories/in-memory/InMemoryUsersRepository';
import RegisterUser, { RegisterUserResponse } from './RegisterUser';

describe('Register User Use Case', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;

  it('should be able to register new user', async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository([]);

    const registerUser = new RegisterUser(inMemoryUsersRepository);

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
    inMemoryUsersRepository = new InMemoryUsersRepository([]);

    const registerUser = new RegisterUser(inMemoryUsersRepository);

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
    const user = User.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('john@doe.com') as Email,
      password: Password.create('123456') as Password,
    }) as User;

    inMemoryUsersRepository = new InMemoryUsersRepository([user]);

    const registerUser = new RegisterUser(inMemoryUsersRepository);

    const { name, email, password } = {
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
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
