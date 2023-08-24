import Sender from '@modules/senders/entities/sender';

import { ISendersSearchParams } from '../../usecases/SearchSenders/dtos/ISendersSearchParams';
import { ISendersSearchResult } from '../../usecases/SearchSenders/dtos/ISendersSearchResult';
import ISendersRepository from '../ISendersRepository';

class InMemorySendersRepository implements ISendersRepository {
  private repository: Sender[] = [];

  async findAll(): Promise<Sender[]> {
    return this.repository;
  }

  async findById(id: string): Promise<Sender> {
    return this.repository.find((sender) => sender.id === id);
  }

  async findDefaultSender(): Promise<Sender> {
    return this.repository.find((sender) => sender.isDefault === true);
  }

  async search({
    query,
    page,
    perPage,
  }: ISendersSearchParams): Promise<ISendersSearchResult> {
    let senderList = this.repository;

    if (query) {
      senderList = this.repository.filter((sender) => {
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
    this.repository.push(sender);
  }

  async save(sender: Sender): Promise<void> {
    const senderIndex = this.repository.findIndex(
      (findSender) => findSender.id === sender.id
    );

    this.repository[senderIndex] = sender;
  }
}

export default InMemorySendersRepository;
