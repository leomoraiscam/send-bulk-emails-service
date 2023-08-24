import InvalidEmailError from '@modules/accounts/entities/errors/InvalidEmailError';
import InvalidNameError from '@modules/accounts/entities/errors/InvalidNameError';
import Email from '@modules/senders/entities/email';
import Name from '@modules/senders/entities/name';
import Sender from '@modules/senders/entities/sender';
import ISendersRepository from '@modules/senders/repositories/ISendersRepository';

import { ICreateSenderRequest } from './dtos/ICreateSenderPayload';

class CreateSender {
  constructor(private sendersRepository: ISendersRepository) {}

  async execute(request: ICreateSenderRequest): Promise<Sender | Error> {
    const { name, email } = request;

    const nameOrError = Name.create(name) as Name;

    if (nameOrError instanceof Error) {
      return new InvalidNameError(name);
    }

    const emailOrError = Email.create(email) as Email;

    if (emailOrError instanceof Error) {
      return new InvalidEmailError(email);
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
