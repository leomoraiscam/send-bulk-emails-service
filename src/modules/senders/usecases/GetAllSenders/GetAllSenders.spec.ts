import { Name, Email, Sender } from '@modules/senders/entities';
import { InMemorySendersRepository } from '@modules/senders/repositories/in-memory/InMemorySendersRepository';

import { GetAllSenders } from './GetAllSenders';

let inMemorySendersRepository: InMemorySendersRepository;
let getAllSenders: GetAllSenders;

describe('Get All Senders Use Case', () => {
  it('should be able to get all senders', async () => {
    inMemorySendersRepository = new InMemorySendersRepository();
    getAllSenders = new GetAllSenders(inMemorySendersRepository);

    const sender1 = Sender.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('john@doe.com') as Email,
    }) as Sender;

    const sender2 = Sender.create({
      name: Name.create('John Doe 2') as Name,
      email: Email.create('john2@doe.com') as Email,
    }) as Sender;

    await Promise.all([
      inMemorySendersRepository.create(sender1),
      inMemorySendersRepository.create(sender2),
    ]);

    const response = await getAllSenders.execute();

    const [firstSender, secondSender] = response;

    expect(response.length).toBe(2);
    expect(firstSender.name.value).toEqual('John Doe');
    expect(secondSender.name.value).toEqual('John Doe 2');
  });
});
