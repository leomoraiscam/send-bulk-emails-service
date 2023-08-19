import Email from '@modules/senders/entities/email';
import Name from '@modules/senders/entities/name';
import Sender from '@modules/senders/entities/sender';
import InMemorySendersRepository from '@modules/senders/repositories/in-memory/InMemorySendersRepository';

import SetDefaultSender from './SetDefaultSender';

let sendersRepository: InMemorySendersRepository;
let setDefaultSender: SetDefaultSender;

describe('Set Default Sender', () => {
  beforeEach(() => {
    sendersRepository = new InMemorySendersRepository();
    setDefaultSender = new SetDefaultSender(sendersRepository);
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

    await sendersRepository.create(defaultSender);
    await sendersRepository.create(notDefaultSender);

    await setDefaultSender.execute({
      senderId: notDefaultSender.id,
    });

    const updatedDefaultSender = await sendersRepository.findById(
      defaultSender.id
    );

    const updatedNotDefaultSender = await sendersRepository.findById(
      notDefaultSender.id
    );

    const currentDefaultSender = await sendersRepository.findDefaultSender();

    expect(updatedDefaultSender.isDefault).toBe(false);
    expect(updatedNotDefaultSender.isDefault).toBe(true);
    expect(currentDefaultSender.id).toEqual(notDefaultSender.id);
  });
});
