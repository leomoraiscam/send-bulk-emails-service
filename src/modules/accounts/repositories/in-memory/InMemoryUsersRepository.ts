/* eslint-disable no-class-assign */
import { User } from '@modules/accounts/entities';

import { IUsersRepository } from '../IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  private repository: User[] = [];

  private static INSTANCE: InMemoryUsersRepository;

  public static getInstance(): InMemoryUsersRepository {
    if (!InMemoryUsersRepository.INSTANCE) {
      InMemoryUsersRepository.INSTANCE = new InMemoryUsersRepository();
    }

    return InMemoryUsersRepository.INSTANCE;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.repository.find((user) => user.email.value === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    this.repository.push(user);
  }
}
