import { InMemoryHashProvider } from 'infra/providers/HashProvider/in-memory/InMemoryHashProvider';

import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { RegisterUser } from '@modules/accounts/useCases/RegisterUser/RegisterUser';
import { RegisterUserController } from '@modules/accounts/useCases/RegisterUser/RegisterUserController';

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryHashProvider = new InMemoryHashProvider();
  // const inMemoryUsersRepository = new InMemoryUsersRepository();
  const inMemoryUsersRepository = InMemoryUsersRepository.getInstance();

  const registerUser = new RegisterUser(
    inMemoryUsersRepository,
    inMemoryHashProvider
  );

  const registerUserController = new RegisterUserController(registerUser);

  return registerUserController;
};
