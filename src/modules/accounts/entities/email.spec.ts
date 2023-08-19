import Email from './email';

describe('User email value object', () => {
  it('should not be able to create a email when the same contains null strings', () => {
    expect(Email.create(null) as Email).toBeInstanceOf(Error);
  });

  it('should not be able to create a email when the same contains empty strings', () => {
    expect(Email.create(null) as Email).toBeInstanceOf(Error);
  });

  it('should not create user with invalid email address', () => {
    expect(Email.create('invalid_email.com') as Email).toBeInstanceOf(Error);
  });

  it('should accept valid email', () => {
    const email = Email.create('local@domain.com') as Email;

    expect(email.value).toBe('local@domain.com');
  });

  it('should not accept local part larger than 64 chars', () => {
    expect(Email.create(`${'l'.repeat(65)}@email.com`)).toBeInstanceOf(Error);
  });

  it('should not accept strings larger than 320 chars', () => {
    expect(
      Email.create(`${'l'.repeat(64)}@${'d'.repeat(128)}.${'d'.repeat(127)}`)
    ).toBeInstanceOf(Error);
  });

  it('should not accept domain part larger than 255 chars', () => {
    expect(
      Email.create(`${'local@'}${'d'.repeat(128)}.${'d'.repeat(127)}`)
    ).toBeInstanceOf(Error);
  });

  it('should not accept empty local part', () => {
    expect(Email.create(`@email.com`)).toBeInstanceOf(Error);
  });

  it('should not accept empty domain part', () => {
    const email = `@`;

    expect(Email.create(email)).toBeInstanceOf(Error);
  });

  it('should not accept domain with a part larger than 63 chars', () => {
    const email = `${'local@'}${'d'.repeat(64)}.com`;

    expect(Email.create(email)).toBeInstanceOf(Error);
  });

  it('should not accept local part with invalid char', () => {
    const email = 'local part@email.com';

    expect(Email.create(email)).toBeInstanceOf(Error);
  });

  it('should not accept local part with two dots', () => {
    const email = 'local..email@domain.com';

    expect(Email.create(email)).toBeInstanceOf(Error);
  });

  it('should not accept local part with ending dot', () => {
    const email = 'local_dot.@email.com';

    expect(Email.create(email)).toBeInstanceOf(Error);
  });

  it('should not accept email without an at-sign', () => {
    const email = 'localDomain.com';

    expect(Email.create(email)).toBeInstanceOf(Error);
  });
});
