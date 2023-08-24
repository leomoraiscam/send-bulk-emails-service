import Sender from '@modules/senders/entities/sender';

export interface ISendersSearchResult {
  data: Sender[];
  totalCount: number;
}
