import { Sender } from '@modules/senders/entities';

export interface ISendersSearchResult {
  data: Sender[];
  totalCount: number;
}
