import Sender from '@modules/senders/entities/sender';
import ISendersRepository from '@modules/senders/repositories/ISendersRepository';

type GetAllSendersResponse = Sender[];

class GetAllSenders {
  constructor(private sendersRepository: ISendersRepository) {}

  async execute(): Promise<GetAllSendersResponse> {
    const senders = await this.sendersRepository.findAll();

    return senders;
  }
}

export default GetAllSenders;
