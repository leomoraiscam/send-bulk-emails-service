import { InMemoryHashProvider } from '@infra/providers/HashProvider/in-memory/InMemoryHashProvider';
import { Email, Name, Password, User } from '@modules/accounts/entities';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';

import { AuthenticateUser } from './AuthenticateUser';
import { AuthenticateUserController } from './AuthenticateUserController';

let inMemoryHashProvider: InMemoryHashProvider;
let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUser;
let authenticateUserController: AuthenticateUserController;
let user: User;

describe('Authenticate User (e2e)', () => {
  beforeEach(async () => {
    inMemoryHashProvider = new InMemoryHashProvider();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUser(
      inMemoryUsersRepository,
      inMemoryHashProvider
    );
    authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCase
    );

    const nameOrError = Name.create('John Doe').value as Name;
    const emailOrError = Email.create('john@doe.com').value as Email;
    const passwordOrError = Password.create('123456', true).value as Password;

    const userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    });

    user = userOrError.value as User;

    await inMemoryUsersRepository.create(user);
  });

  it('should be able to authenticate', async () => {
    const response = await authenticateUserController.handle({
      email: 'john@doe.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });
});
