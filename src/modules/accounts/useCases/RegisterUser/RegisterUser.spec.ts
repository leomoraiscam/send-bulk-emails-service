import RegisterUser, { RegisterUserResponse } from './RegisterUser';

describe('Register User Use Case', () => {
  it('should be able to register new user', async () => {
    const registerUser = new RegisterUser();

    const userData = {
      name: 'John Doe',
      email: 'john@email.com',
      password: 'test@1234',
    };

    const user = (await registerUser.execute({
      ...userData,
    })) as RegisterUserResponse;

    expect(user.name).toBe('John Doe');
  });

  it('should not be able to register new user with invalid data', async () => {
    const registerUser = new RegisterUser();

    const userData = {
      name: 'John Doe',
      email: 'john@email.com',
      password: 't1',
    };

    const response = await registerUser.execute({
      ...userData,
    });

    expect(response).toEqual('InvalidPasswordLengthError');
  });

  // it.todo(
  //   'should not be able to register new user with existing email',
  //   () => {}
  // );
});
