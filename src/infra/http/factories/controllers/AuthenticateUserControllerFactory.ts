import { InMemoryHashProvider } from 'infra/providers/HashProvider/in-memory/InMemoryHashProvider';

import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { AuthenticateUser } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUser';
import { AuthenticateUserController } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';

export const makeAuthenticateUserController =
  (): AuthenticateUserController => {
    const inMemoryHashProvider = new InMemoryHashProvider();
    const inMemoryUsersRepository = InMemoryUsersRepository.getInstance();

    // const inMemoryUsersRepository = new InMemoryUsersRepository();

    const authenticateUser = new AuthenticateUser(
      inMemoryUsersRepository,
      inMemoryHashProvider
    );

    const authenticateUserController = new AuthenticateUserController(
      authenticateUser
    );

    return authenticateUserController;
  };
