import { Name, Email, Sender } from '@modules/senders/entities';
import {
  InvalidNameError,
  InvalidEmailError,
} from '@modules/senders/entities/errors';
import { ISendersRepository } from '@modules/senders/repositories/ISendersRepository';

import { ICreateSenderRequest } from './dtos/ICreateSenderPayload';

export class CreateSender {
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
