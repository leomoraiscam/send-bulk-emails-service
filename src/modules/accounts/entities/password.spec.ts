import Password from './password';

describe('Domain password entity', () => {
  it('should accept valid password', () => {
    const passwordOrError = Password.create('123456');

    expect(passwordOrError.value).toBe('123456');
  });

  it('should not be able to create a password when the same contains null strings', () => {
    expect(() => Password.create(null) as Password).toThrow();
  });

  it('should reject password with less than 6 characters', () => {
    expect(() => Password.create('12345')).toThrow();
  });

  it('should reject password with more than 255 characters', () => {
    expect(() => Password.create('1'.repeat(260))).toThrow();
  });
});
