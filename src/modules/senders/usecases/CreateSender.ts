import InvalidEmailError from '@modules/accounts/entities/errors/InvalidEmailError';
import InvalidNameError from '@modules/accounts/entities/errors/InvalidNameError';
import Email from '@modules/senders/entities/email';
import Name from '@modules/senders/entities/name';
import Sender from '@modules/senders/entities/sender';
import ISendersRepository from '@modules/senders/repositories/ISendersRepository';

type CreateSenderRequest = {
  name: string;
  email: string;
};

class CreateSender {
  constructor(private sendersRepository: ISendersRepository) {}

  async execute({
    name,
    email,
  }: CreateSenderRequest): Promise<Sender | string> {
    const nameOrError = Name.create(name) as Name;
    const emailOrError = Email.create(email) as Email;

    if (typeof nameOrError === 'string') {
      const { name: NameError } = new InvalidNameError(name);

      return NameError;
    }

    if (typeof emailOrError === 'string') {
      const { name } = new InvalidEmailError(email);

      return name;
    }

    const senderOrError = Sender.create({
      name: nameOrError,
      email: emailOrError,
    });

    if (senderOrError instanceof Error) {
      throw new Error(`Sender data is incorrect`);
    }

    await this.sendersRepository.create(senderOrError);

    return senderOrError;
  }
}

export default CreateSender;
