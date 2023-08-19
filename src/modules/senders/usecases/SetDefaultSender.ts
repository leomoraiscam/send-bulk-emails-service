import ISendersRepository from '@modules/senders/repositories/ISendersRepository';

import InvalidSenderError from './errors/InvalidSenderError';

type SetDefaultSenderRequest = {
  senderId: string;
};

class SetDefaultSender {
  constructor(private sendersRepository: ISendersRepository) {}

  async execute({
    senderId,
  }: SetDefaultSenderRequest): Promise<InvalidSenderError | null> {
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
