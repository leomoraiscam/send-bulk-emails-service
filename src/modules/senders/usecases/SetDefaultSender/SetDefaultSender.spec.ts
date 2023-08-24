import { Name, Email, Sender } from '@modules/senders/entities';
import { InMemorySendersRepository } from '@modules/senders/repositories/in-memory/InMemorySendersRepository';

import { SetDefaultSender } from './SetDefaultSender';

let inMemorySendersRepository: InMemorySendersRepository;
let setDefaultSender: SetDefaultSender;

describe('Set Default Sender Use Case', () => {
  beforeEach(() => {
    inMemorySendersRepository = new InMemorySendersRepository();
    setDefaultSender = new SetDefaultSender(inMemorySendersRepository);
  });

  it('should be able to set default sender', async () => {
    const defaultSender = Sender.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('johndoe1@example.com') as Email,
      isDefault: true,
    }) as Sender;

    const notDefaultSender = Sender.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('johndoe2@example.com') as Email,
      isDefault: false,
    }) as Sender;

    await Promise.all([
      inMemorySendersRepository.create(defaultSender),
      inMemorySendersRepository.create(notDefaultSender),
    ]);

    await setDefaultSender.execute({
      senderId: notDefaultSender.id,
    });

    const updatedDefaultSender = await inMemorySendersRepository.findById(
      defaultSender.id
    );

    const updatedNotDefaultSender = await inMemorySendersRepository.findById(
      notDefaultSender.id
    );

    const currentDefaultSender =
      await inMemorySendersRepository.findDefaultSender();

    expect(updatedDefaultSender.isDefault).toBe(false);
    expect(updatedNotDefaultSender.isDefault).toBe(true);
    expect(currentDefaultSender.id).toEqual(notDefaultSender.id);
  });
});
