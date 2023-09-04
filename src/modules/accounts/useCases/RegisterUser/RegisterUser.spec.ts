import { InMemoryHashProvider } from '@infra/providers/HashProvider/in-memory/InMemoryHashProvider';
import { Email, Name, Password, User } from '@modules/accounts/entities';

import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';
import { RegisterUser } from './RegisterUser';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryHashProvider;
let registerUser: RegisterUser;

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    registerUser = new RegisterUser(
      inMemoryUsersRepository,
      inMemoryHashProvider
    );
  });

  it('should be able to register new user', async () => {
    const response = await registerUser.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: 'test@1234',
    });

    const user = await inMemoryUsersRepository.findByEmail('john@email.com');

    expect(user.name.value).toBe('John Doe');
    expect(response.isRight()).toBeTruthy();
  });

  it('should not be able to register new user with invalid data', async () => {
    const response = await registerUser.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    expect(response.isLeft()).toBeTruthy();
  });

  it('should not be able to register new user with existing email', async () => {
    const nameOrError = Name.create('John Doe').value as Name;
    const emailOrError = Email.create('john@doe.com').value as Email;
    const passwordOrError = Password.create('test@123456', true)
      .value as Password;

    const userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    });

    const user = userOrError.value as User;

    await inMemoryUsersRepository.create(user);

    const response = await registerUser.execute({
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(
      new AccountAlreadyExistsError('john@doe.com')
    );
  });
});
