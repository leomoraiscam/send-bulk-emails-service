import Sender from '@modules/senders/entities/sender';

import ISendersRepository, {
  SendersSearchParams,
  SendersSearchResult,
} from '../ISendersRepository';

class InMemorySendersRepository implements ISendersRepository {
  constructor(public items: Sender[] = []) {}

  async findAll(): Promise<Sender[]> {
    return this.items;
  }

  async findById(id: string): Promise<Sender> {
    return this.items.find((sender) => sender.id === id);
  }

  async findDefaultSender(): Promise<Sender> {
    return this.items.find((sender) => sender.isDefault === true);
  }

  async search({
    query,
    page,
    perPage,
  }: SendersSearchParams): Promise<SendersSearchResult> {
    let senderList = this.items;

    if (query) {
      senderList = this.items.filter((sender) => {
        const search = new RegExp(query, 'i');
        return (
          search.test(sender.name.value) || search.test(sender.email.value)
        );
      });
    }

    return {
      data: senderList.slice((page - 1) * perPage, page * perPage),
      totalCount: senderList.length,
    };
  }

  async create(sender: Sender): Promise<void> {
    this.items.push(sender);
  }

  async save(sender: Sender): Promise<void> {
    const senderIndex = this.items.findIndex(
      (findSender) => findSender.id === sender.id
    );

    this.items[senderIndex] = sender;
  }
}

export default InMemorySendersRepository;
