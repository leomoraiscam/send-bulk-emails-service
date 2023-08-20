import InMemorySendersRepository from '@modules/senders/repositories/in-memory/InMemorySendersRepository';

import CreateSender from './CreateSender';

let inMemorySendersRepository: InMemorySendersRepository;
let createSender: CreateSender;

describe('Create Sender Use Case', () => {
  beforeEach(() => {
    inMemorySendersRepository = new InMemorySendersRepository();
    createSender = new CreateSender(inMemorySendersRepository);
  });

  it('should be able to create a new sender', async () => {
    await createSender.execute({
      name: 'John Doe',
      email: 'john@doe.com',
    });

    const [sender] = await inMemorySendersRepository.findAll();

    expect(sender).toEqual(
      expect.objectContaining({
        _name: { name: expect.any(String) },
        _email: { email: expect.any(String) },
      })
    );
  });

  it('should not be able to create a sender with invalid name', async () => {
    expect(
      await createSender.execute({
        name: '',
        email: 'john@doe.com',
      })
    ).toBeInstanceOf(Error);
  });

  it('should not be able to create a sender with invalid e-mail', async () => {
    expect(
      await createSender.execute({
        name: 'John Doe',
        email: 'invalid',
      })
    ).toBeInstanceOf(Error);
  });
});
