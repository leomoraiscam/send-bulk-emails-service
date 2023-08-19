import Email from './email';
import Name from './name';
import Password from './password';
import User from './user';

describe('User Domain Entity', () => {
  it('should be able to create a user', () => {
    const userOrError = User.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('john@doe.com') as Email,
      password: Password.create('123456') as Password,
    }) as User;

    expect(userOrError.name.value).toBe('John Doe');
  });
});
