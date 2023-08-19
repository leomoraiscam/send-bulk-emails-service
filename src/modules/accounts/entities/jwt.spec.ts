import Email from './email';
import JWT, { IJWTTokenPayload } from './jwt';
import Name from './name';
import Password from './password';
import User from './user';

describe('User JWT object value', () => {
  it('should be able to create new user', () => {
    const user = User.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('john@doe.com') as Email,
      password: Password.create('123456') as Password,
    }) as User;

    const jwt = JWT.signUser(user);

    expect(jwt.value).toEqual(expect.any(String));
  });

  it('should not be able to initialize JWT from invalid token', () => {
    expect(() => JWT.createFromJWT('invalid-token')).toThrow();
  });

  it('should be able to decode JWT token', () => {
    const user = User.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('john@doe.com') as Email,
      password: Password.create('123456') as Password,
    }) as User;

    const jwt = JWT.signUser(user);

    const decodedOrError = JWT.decodeToken(jwt.value);
    const decoded = decodedOrError as IJWTTokenPayload;

    expect(decoded.exp).toEqual(expect.any(Number));
  });

  it('should not be able to decode invalid JWT token', () => {
    expect(() => JWT.decodeToken('invalid-token')).toThrow();
  });
});
