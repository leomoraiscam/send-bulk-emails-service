import Sender from '@modules/senders/entities/sender';
import ISendersRepository from '@modules/senders/repositories/ISendersRepository';

type GetAllSendersResponse = Sender[];

class GetAllSenders {
  constructor(private sendersRepository: ISendersRepository) {}

  async execute(): Promise<GetAllSendersResponse> {
    return this.sendersRepository.findAll();
  }
}

export default GetAllSenders;
