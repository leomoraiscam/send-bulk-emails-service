import { InMemoryHashProvider } from '@infra/providers/HashProvider/in-memory/InMemoryHashProvider';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';

import { IRegisterUserPayload as IRegisterUserRequest } from './dtos/IRegisterUserPayload';
import { RegisterUser } from './RegisterUser';
import { RegisterUserController } from './RegisterUserController';

let inMemoryHashProvider: InMemoryHashProvider;
let inMemoryUsersRepository: InMemoryUsersRepository;
let registerUserUseCase: RegisterUser;
let registerUserController: RegisterUserController;

describe('Register User (e2e)', () => {
  beforeEach(() => {
    inMemoryHashProvider = new InMemoryHashProvider();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerUserUseCase = new RegisterUser(
      inMemoryUsersRepository,
      inMemoryHashProvider
    );
    registerUserController = new RegisterUserController(registerUserUseCase);
  });

  it('should be able to register new user', async () => {
    const request: IRegisterUserRequest = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'test@1234',
    };

    const response = await registerUserController.handle(request);

    expect(response.status).toBe(201);
  });

  it('should not be able to register new user', async () => {
    const request: IRegisterUserRequest = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123',
    };

    const response = await registerUserController.handle(request);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'The password must have between 6 and 255 characters.'
    );
  });

  it('should not be able to register new user when is missing name', async () => {
    const request: IRegisterUserRequest = {
      name: '',
      email: 'johndoe@gmail.com',
      password: 'test@123',
    };

    const response = await registerUserController.handle(request);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing parameter from request: name.');
  });

  it('should not be able to register new user when is missing email', async () => {
    const request: IRegisterUserRequest = {
      name: 'John Doe',
      email: '',
      password: 'test@123',
    };

    const response = await registerUserController.handle(request);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing parameter from request: email.');
  });
});
