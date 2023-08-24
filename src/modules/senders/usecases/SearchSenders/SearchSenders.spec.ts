import { Name, Email, Sender } from '@modules/senders/entities';
import { InMemorySendersRepository } from '@modules/senders/repositories/in-memory/InMemorySendersRepository';

import { SearchSenders } from './SearchSenders';

let inMemorySendersRepository: InMemorySendersRepository;
let searchSenders: SearchSenders;

describe('Search Senders Use Case', () => {
  beforeEach(async () => {
    inMemorySendersRepository = new InMemorySendersRepository();
    searchSenders = new SearchSenders(inMemorySendersRepository);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 20; i++) {
      const sender = Sender.create({
        name: Name.create(`John Doe${i}`) as Name,
        email: Email.create('john@doe.com') as Email,
      }) as Sender;

      // eslint-disable-next-line no-await-in-loop
      await inMemorySendersRepository.create(sender);
    }
  });

  it('should be able to list senders without search', async () => {
    const { data, totalCount } = await searchSenders.execute({ query: '' });

    expect(data.length).toEqual(20);
    expect(totalCount).toEqual(20);
  });

  it('should be able to search through senders', async () => {
    const { data, totalCount } = await searchSenders.execute({ query: 'Doe5' });

    expect(data.length).toEqual(1);
    expect(totalCount).toEqual(1);
    expect(data[0].name.value).toEqual('John Doe5');
  });

  it('should be able to search through senders with case-insensitive', async () => {
    const { data, totalCount } = await searchSenders.execute({ query: 'DOE5' });

    expect(data.length).toEqual(1);
    expect(totalCount).toEqual(1);
    expect(data[0].name.value).toEqual('John Doe5');
  });

  it('should be able to paginate through senders', async () => {
    const { data, totalCount } = await searchSenders.execute({ perPage: 10 });

    expect(data.length).toEqual(10);
    expect(totalCount).toEqual(20);
    expect(data[0].name.value).toEqual('John Doe0');

    const response = await searchSenders.execute({ perPage: 10, page: 2 });

    expect(response.data.length).toEqual(10);
    expect(response.totalCount).toEqual(20);
    expect(response.data[0].name.value).toEqual('John Doe10');
  });
});
