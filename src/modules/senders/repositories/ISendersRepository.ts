import { Sender } from '@modules/senders/entities';

import { ISendersSearchParams } from '../usecases/SearchSenders/dtos/ISendersSearchParams';
import { ISendersSearchResult } from '../usecases/SearchSenders/dtos/ISendersSearchResult';

export interface ISendersRepository {
  findAll(): Promise<Sender[]>;
  findById(id: string): Promise<Sender>;
  findDefaultSender(): Promise<Sender>;
  search(params: ISendersSearchParams): Promise<ISendersSearchResult>;
  create(sender: Sender): Promise<void>;
  save(sender: Sender): Promise<void>;
}
