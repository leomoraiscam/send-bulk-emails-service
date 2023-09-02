import { Email } from './email';

describe('User email value object', () => {
  it('should accept valid email', () => {
    const emailOrError = Email.create('local@domain.com');

    expect(emailOrError.isRight()).toBeTruthy();
  });

  it('should not be able to create a email when the same contains null strings', () => {
    const emailOrError = Email.create(null);

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not be able to create a email when the same contains empty strings', () => {
    const emailOrError = Email.create(null);

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not create user with invalid email address', () => {
    const emailOrError = Email.create('invalid_email.com');

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept local part larger than 64 chars', () => {
    const emailOrError = Email.create(`${'l'.repeat(65)}@email.com`);

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept strings larger than 320 chars', () => {
    const emailOrError = Email.create(
      `${'l'.repeat(64)}@${'d'.repeat(128)}.${'d'.repeat(127)}`
    );

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept domain part larger than 255 chars', () => {
    const emailOrError = Email.create(
      `${'local@'}${'d'.repeat(128)}.${'d'.repeat(127)}`
    );

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept empty local part', () => {
    const emailOrError = Email.create(`@email.com`);

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept empty domain part', () => {
    const email = `@`;
    const emailOrError = Email.create(email);

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept domain with a part larger than 63 chars', () => {
    const email = `${'local@'}${'d'.repeat(64)}.com`;
    const emailOrError = Email.create(email);

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept local part with invalid char', () => {
    const email = 'local part@email.com';
    const emailOrError = Email.create(email);

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept local part with two dots', () => {
    const email = 'local..email@domain.com';
    const emailOrError = Email.create(email);

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept local part with ending dot', () => {
    const email = 'local_dot.@email.com';
    const emailOrError = Email.create(email);

    expect(emailOrError.isLeft()).toBeTruthy();
  });

  it('should not accept email without an at-sign', () => {
    const email = 'localDomain.com';
    const emailOrError = Email.create(email);

    expect(emailOrError.isLeft()).toBeTruthy();
  });
});
