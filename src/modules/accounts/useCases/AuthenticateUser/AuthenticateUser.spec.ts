import Email from '@modules/accounts/entities/email';
import Name from '@modules/accounts/entities/name';
import Password from '@modules/accounts/entities/password';
import User from '@modules/accounts/entities/user';

import InMemoryUsersRepository from '../../repositories/in-memory/InMemoryUsersRepository';
import AuthenticateUser from './AuthenticateUser';

let usersRepository: InMemoryUsersRepository;
let authenticateUser: AuthenticateUser;

describe('Authenticate User', () => {
  it('should be able to authenticate', async () => {
    usersRepository = new InMemoryUsersRepository([]);
    authenticateUser = new AuthenticateUser(usersRepository);

    const user = User.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('john@doe.com') as Email,
      password: Password.create('123456') as Password,
    }) as User;

    usersRepository.create(user);

    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: '123456',
    });

    expect(response).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
  });

  it('should not be able to authenticate when user e-mail does not exist in database', async () => {
    usersRepository = new InMemoryUsersRepository([]);
    authenticateUser = new AuthenticateUser(usersRepository);

    const response = await authenticateUser.execute({
      email: 'invalid@example.com',
      password: '123456',
    });

    expect(response).toEqual('InvalidEmailOrPasswordError');
  });

  it('should not be able to authenticate with invalid password', async () => {
    usersRepository = new InMemoryUsersRepository([]);
    authenticateUser = new AuthenticateUser(usersRepository);

    const user = User.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('john@doe.com') as Email,
      password: Password.create('123456') as Password,
    }) as User;

    await usersRepository.create(user);

    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: 'invalid-password',
    });

    expect(response).toEqual('InvalidEmailOrPasswordError');
  });
});
