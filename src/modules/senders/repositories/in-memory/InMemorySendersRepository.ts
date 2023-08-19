import Sender from '@modules/senders/entities/sender';

import ISendersRepository from '../ISendersRepository';

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
