import Sender from '@modules/senders/entities/sender';

import ISendersRepository from '../ISendersRepository';

class InMemorySendersRepository implements ISendersRepository {
  constructor(public items: Sender[] = []) {}

  async findAll(): Promise<Sender[]> {
    return this.items;
  }

  async create(sender: Sender): Promise<void> {
    this.items.push(sender);
  }
}

export default InMemorySendersRepository;
