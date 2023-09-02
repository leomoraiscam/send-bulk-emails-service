import { Name } from '.';

describe('User name object value', () => {
  it('should be able to create a name with valid name', () => {
    const nameOrError = Name.create('john');

    expect(nameOrError.isRight()).toBeTruthy();
  });

  it('should not be able to create a name with invalid name (when the same a not send)', () => {
    const nameOrError = Name.create('');

    expect(nameOrError.isLeft()).toBeTruthy();
  });

  it('should not be able to create a name with invalid name (when the same less 3 chars)', () => {
    const nameOrError = Name.create('l');

    expect(nameOrError.isLeft()).toBeTruthy();
  });

  it('should not be able to create a name with invalid name (when the same than 255 chars)', () => {
    const nameOrError = Name.create('l'.repeat(256));

    expect(nameOrError.isLeft()).toBeTruthy();
  });
});
