import { InMemoryHashProvider } from '@infra/providers/HashProvider/in-memory/InMemoryHashProvider';
import { Email, Name, Password, User } from '@modules/accounts/entities';

import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { AuthenticateUser } from './AuthenticateUser';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryHashProvider;
let authenticateUser: AuthenticateUser;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryHashProvider = new InMemoryHashProvider();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUser = new AuthenticateUser(
      inMemoryUsersRepository,
      inMemoryHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const nameOrError = Name.create('John Doe').value as Name;
    const emailOrError = Email.create('john@doe.com').value as Email;
    const passwordOrError = Password.create('123456', true).value as Password;

    const userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    });

    const user = userOrError.value as User;

    inMemoryUsersRepository.create(user);

    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: '123456',
    });

    expect(response.value).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
  });

  it('should not be able to authenticate when user e-mail does not exist in database', async () => {
    const response = await authenticateUser.execute({
      email: 'invalid@example.com',
      password: '123456',
    });

    expect(response.isLeft()).toBeTruthy();
  });

  it('should not be able to authenticate with wrong user password', async () => {
    const nameOrError = Name.create('John Doe').value as Name;
    const emailOrError = Email.create('john@doe.com').value as Email;
    const passwordOrError = Password.create('123456', true).value as Password;

    const userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    });

    const user = userOrError.value as User;

    await inMemoryUsersRepository.create(user);

    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: 'invalid-password',
    });

    expect(response.isLeft).toBeTruthy();
  });
});
