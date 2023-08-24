import ISendersRepository from '@modules/senders/repositories/ISendersRepository';

import { ISendersSearchParams } from './dtos/ISendersSearchParams';
import { ISendersSearchResult } from './dtos/ISendersSearchResult';

export class SearchSenders {
  constructor(private sendersRepository: ISendersRepository) {}

  async execute({
    query,
    page = 1,
    perPage = 20,
  }: ISendersSearchParams): Promise<ISendersSearchResult> {
    const { data, totalCount } = await this.sendersRepository.search({
      query,
      page,
      perPage,
    });

    return { data, totalCount };
  }
}
