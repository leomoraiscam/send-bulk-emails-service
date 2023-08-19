import InMemorySendersRepository from '@modules/senders/repositories/in-memory/InMemorySendersRepository';

import CreateSender from './CreateSender';

let sendersRepository: InMemorySendersRepository;
let createSender: CreateSender;

describe('Create Sender Use Case', () => {
  it('should be able to create a new sender', async () => {
    sendersRepository = new InMemorySendersRepository();
    createSender = new CreateSender(sendersRepository);

    await createSender.execute({
      name: 'John Doe',
      email: 'john@doe.com',
    });

    expect(sendersRepository.items[0]).toEqual(
      expect.objectContaining({
        _name: { name: expect.any(String) },
        _email: { email: expect.any(String) },
      })
    );
  });

  it('should not be able to create a sender with invalid name', async () => {
    sendersRepository = new InMemorySendersRepository();
    createSender = new CreateSender(sendersRepository);

    await createSender.execute({
      name: '',
      email: 'john@doe.com',
    });

    expect(sendersRepository.items.length).toBe(0);
  });

  it('should not be able to create a sender with invalid e-mail', async () => {
    sendersRepository = new InMemorySendersRepository();
    createSender = new CreateSender(sendersRepository);

    await createSender.execute({
      name: 'John Doe',
      email: 'invalid',
    });

    expect(sendersRepository.items.length).toBe(0);
  });
});
