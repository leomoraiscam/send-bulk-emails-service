import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';

import { IRegisterUserPayload as IRegisterUserRequest } from './dtos/IRegisterUserPayload';
import { RegisterUser } from './RegisterUser';
import { RegisterUserController } from './RegisterUserController';

describe('Register User (e2e)', () => {
  it('should be able to register new user', async () => {
    const request: IRegisterUserRequest = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'test@1234',
    };

    const hashProvider = {
      generateHash: jest.fn(),
      compareHash: jest.fn(),
    };

    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserUseCase = new RegisterUser(
      inMemoryUsersRepository,
      hashProvider
    );
    const registerUserController = new RegisterUserController(
      registerUserUseCase
    );

    const response = await registerUserController.handle(request);

    expect(response.status).toBe(201);
  });

  it('should not be able to register new user', async () => {
    const request: IRegisterUserRequest = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 't',
    };

    const hashProvider = {
      generateHash: jest.fn(),
      compareHash: jest.fn(),
    };

    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserUseCase = new RegisterUser(
      inMemoryUsersRepository,
      hashProvider
    );
    const registerUserController = new RegisterUserController(
      registerUserUseCase
    );

    const response = await registerUserController.handle(request);

    expect(response.status).toBe(400);
    expect(response.body.data).toBe('InvalidPasswordLengthError');
  });

  it('should not be able to register new user when is missing name', async () => {
    const request: IRegisterUserRequest = {
      name: '',
      email: 'johndoe@gmail.com',
      password: 'test@123',
    };

    const hashProvider = {
      generateHash: jest.fn(),
      compareHash: jest.fn(),
    };

    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserUseCase = new RegisterUser(
      inMemoryUsersRepository,
      hashProvider
    );
    const registerUserController = new RegisterUserController(
      registerUserUseCase
    );

    const response = await registerUserController.handle(request);

    expect(response.status).toBe(400);
    expect(response.body.data).toBe(
      '[MissingParamError: Missing parameter from request: name.]'
    );
  });

  it('should not be able to register new user when is missing email', async () => {
    const request: IRegisterUserRequest = {
      name: 'John Doe',
      email: '',
      password: 'test@123',
    };

    const hashProvider = {
      generateHash: jest.fn(),
      compareHash: jest.fn(),
    };

    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserUseCase = new RegisterUser(
      inMemoryUsersRepository,
      hashProvider
    );
    const registerUserController = new RegisterUserController(
      registerUserUseCase
    );

    const response = await registerUserController.handle(request);

    expect(response.status).toBe(400);
    expect(response.body.data).toBe(
      '[MissingParamError: Missing parameter from request: email.]'
    );
  });
});
