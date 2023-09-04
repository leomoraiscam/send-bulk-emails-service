import { Email, User, JWT, Name, Password } from '.';
import { IJWTTokenPayload } from './dtos/IJwtProps';
import { InvalidJWTTokenError } from './errors';

let userOrError;

describe('User JWT object value', () => {
  beforeEach(() => {
    const nameOrError = Name.create('John Doe').value as Name;
    const emailOrError = Email.create('john@doe.com').value as Email;
    const passwordOrError = Password.create('123456', true).value as Password;

    userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    });
  });

  it('should be able to create new user', () => {
    const jwt = JWT.signUser(userOrError);

    expect(jwt.value).toEqual(expect.any(String));
  });

  it('should not be able to initialize JWT from invalid token', () => {
    const jwtOrError = JWT.createFromJWT('invalid-token');

    expect(jwtOrError.isLeft()).toBeTruthy();
  });

  it('should be able to decode JWT token', () => {
    const jwtOrError = JWT.signUser(userOrError);

    const decodedOrError = JWT.decodeToken(jwtOrError.value);
    const decoded = decodedOrError.value as IJWTTokenPayload;

    expect(decodedOrError.isRight()).toBe(true);
    expect(decoded.exp).toEqual(expect.any(Number));
  });

  it('should not be able to decode invalid JWT token', () => {
    const jwtOrError = JWT.decodeToken('invalid-token');

    expect(jwtOrError.isLeft()).toBe(true);
    expect(jwtOrError.value).toEqual(new InvalidJWTTokenError());
  });
});
