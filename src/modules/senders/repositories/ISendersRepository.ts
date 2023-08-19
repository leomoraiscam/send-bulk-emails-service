import Sender from '@modules/senders/entities/sender';

export type SendersSearchParams = {
  query?: string;
  page: number;
  perPage: number;
};

export type SendersSearchResult = {
  data: Sender[];
  totalCount: number;
};

interface ISendersRepository {
  findAll(): Promise<Sender[]>;
  findById(id: string): Promise<Sender>;
  findDefaultSender(): Promise<Sender>;
  search(params: SendersSearchParams): Promise<SendersSearchResult>;
  create(sender: Sender): Promise<void>;
  save(sender: Sender): Promise<void>;
}

export default ISendersRepository;
