import { Email, Name, Password, User } from '.';

describe('User Domain Entity', () => {
  it('should be able to create a user', () => {
    const nameOrError = Name.create('John Doe').value as Name;
    const emailOrError = Email.create('john@doe.com').value as Email;
    const passwordOrError = Password.create('123456', true).value as Password;

    const userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    });

    expect(userOrError.isRight()).toBeTruthy();
  });
});
