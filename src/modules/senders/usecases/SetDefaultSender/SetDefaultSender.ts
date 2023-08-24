import ISendersRepository from '@modules/senders/repositories/ISendersRepository';

import { ISetDefaultSenderRequest } from './dtos/ISetDefaultSenderPayload';
import InvalidSenderError from './errors/InvalidSenderError';

class SetDefaultSender {
  constructor(private sendersRepository: ISendersRepository) {}

  async execute(
    request: ISetDefaultSenderRequest
  ): Promise<InvalidSenderError | null> {
    const { senderId } = request;

    const sender = await this.sendersRepository.findById(senderId);

    if (!sender) {
      return new InvalidSenderError();
    }

    const currentDefaultSender =
      await this.sendersRepository.findDefaultSender();

    if (currentDefaultSender) {
      currentDefaultSender.unsetAsDefault();

      await this.sendersRepository.save(currentDefaultSender);
    }

    sender.setAsDefault();

    await this.sendersRepository.save(sender);

    return null;
  }
}

export default SetDefaultSender;
