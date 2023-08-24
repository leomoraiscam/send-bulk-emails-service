import { Sender } from '@modules/senders/entities';
import { ISendersRepository } from '@modules/senders/repositories/ISendersRepository';

type GetAllSendersResponse = Sender[];

export class GetAllSenders {
  constructor(private sendersRepository: ISendersRepository) {}

  async execute(): Promise<GetAllSendersResponse> {
    return this.sendersRepository.findAll();
  }
}
