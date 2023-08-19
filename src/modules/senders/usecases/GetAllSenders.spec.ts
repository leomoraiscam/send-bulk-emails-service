import Email from '@modules/senders/entities/email';
import Name from '@modules/senders/entities/name';
import Sender from '@modules/senders/entities/sender';
import InMemorySendersRepository from '@modules/senders/repositories/in-memory/InMemorySendersRepository';

import GetAllSenders from './GetAllSenders';

let sendersRepository: InMemorySendersRepository;
let getAllSenders: GetAllSenders;

describe('Get All Senders Use Case', () => {
  it('should be able to get all senders', async () => {
    sendersRepository = new InMemorySendersRepository();
    getAllSenders = new GetAllSenders(sendersRepository);

    const sender1 = Sender.create({
      name: Name.create('John Doe') as Name,
      email: Email.create('john@doe.com') as Email,
    }) as Sender;

    const sender2 = Sender.create({
      name: Name.create('John Doe 2') as Name,
      email: Email.create('john2@doe.com') as Email,
    }) as Sender;

    sendersRepository.create(sender1);
    sendersRepository.create(sender2);

    const response = await getAllSenders.execute();

    expect(response.length).toBe(2);
    expect(response[0].name.value).toEqual('John Doe');
    expect(response[1].name.value).toEqual('John Doe 2');
  });
});
