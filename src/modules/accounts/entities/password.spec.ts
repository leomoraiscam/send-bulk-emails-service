import { Password } from './password';

describe('User password object value', () => {
  it('should accept valid password', () => {
    const passwordOrError = Password.create('123456', true);

    expect(passwordOrError.isRight()).toBeTruthy();
  });

  it('should not be able to create a password when the same contains null strings', () => {
    const passwordOrError = Password.create(null);

    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  it('should reject password with less than 6 characters', () => {
    const passwordOrError = Password.create('12345');

    expect(passwordOrError.isLeft()).toBeTruthy();
  });

  it('should reject password with more than 255 characters', () => {
    const passwordOrError = Password.create('1'.repeat(260));

    expect(passwordOrError.isLeft()).toBeTruthy();
  });
});
