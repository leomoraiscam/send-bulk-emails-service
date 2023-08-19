import Sender from '@modules/senders/entities/sender';

interface ISendersRepository {
  findAll(): Promise<Sender[]>;
  create(sender: Sender): Promise<void>;
}

export default ISendersRepository;
