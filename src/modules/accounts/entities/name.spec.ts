import Name from './name';

describe('User name object value', () => {
  it('should be able to create a name with valid name', () => {
    const name = Name.create('john') as Name;

    expect(name.value).toBe('john');
  });

  it('should not be able to create a name with invalid name (when the same a not send)', () => {
    expect(Name.create('')).toBeInstanceOf(Error);
  });

  it('should not be able to create a name with invalid name (when the same less 3 chars)', () => {
    expect(Name.create('l')).toBeInstanceOf(Error);
  });

  it('should not be able to create a name with invalid name (when the same than 255 chars)', () => {
    expect(Name.create('l'.repeat(256))).toBeInstanceOf(Error);
  });
});
