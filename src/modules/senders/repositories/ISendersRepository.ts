import Sender from '@modules/senders/entities/sender';

interface ISendersRepository {
  create(sender: Sender): Promise<void>;
}

export default ISendersRepository;
