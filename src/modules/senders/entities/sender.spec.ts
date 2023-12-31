import { Email, Name, Sender } from '.';

describe('Sender Domain Entity', () => {
  it('should be able to create new sender', () => {
    const name = Name.create('John Doe') as Name;
    const email = Email.create('johndoe@example') as Email;

    const senderOrError = Sender.create({
      name,
      email,
    }) as Sender;

    expect(senderOrError.name.value).toBe(name.value);
  });
});
