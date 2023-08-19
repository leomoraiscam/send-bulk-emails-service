import Sender from '@modules/senders/entities/sender';

interface ISendersRepository {
  findAll(): Promise<Sender[]>;
  findById(id: string): Promise<Sender>;
  findDefaultSender(): Promise<Sender>;
  create(sender: Sender): Promise<void>;
  save(sender: Sender): Promise<void>;
}

export default ISendersRepository;
