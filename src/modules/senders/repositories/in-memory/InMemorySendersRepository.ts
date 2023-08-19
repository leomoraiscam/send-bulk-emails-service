import Sender from '@modules/senders/entities/sender';

import ISendersRepository from '../ISendersRepository';

class InMemorySendersRepository implements ISendersRepository {
  constructor(public items: Sender[] = []) {}

  async create(sender: Sender): Promise<void> {
    this.items.push(sender);
  }
}

export default InMemorySendersRepository;
