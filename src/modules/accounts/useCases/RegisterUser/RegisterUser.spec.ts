import { InMemoryHashProvider } from '@infra/providers/HashProvider/in-memory/InMemoryHashProvider';
import { Email, Name, Password, User } from '@modules/accounts/entities';

import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
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
    await registerUser.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: 'test@1234',
    });

    const user = await inMemoryUsersRepository.findByEmail('john@email.com');

    expect(user.name.value).toBe('John Doe');
  });

  it('should not be able to register new user with invalid data', async () => {
    expect(
      await registerUser.execute({
        name: 'John Doe',
        email: 'john@email.com',
        password: 't1',
      })
    ).toBeInstanceOf(Error);
  });

  it('should not be able to register new user with existing email', async () => {
    const user = User.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('john@doe.com') as Email,
      password: Password.create('123456') as Password,
    }) as User;

    await inMemoryUsersRepository.create(user);

    expect(
      await registerUser.execute({
        name: user.name.value,
        email: user.email.value,
        password: user.password.value,
      })
    ).toBeInstanceOf(Error);
  });
});
