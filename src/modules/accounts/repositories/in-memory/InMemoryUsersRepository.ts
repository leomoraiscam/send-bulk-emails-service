import User from '@modules/accounts/entities/user';

import { IUsersRepository } from '../IUsersRepository';

class InMemoryUsersRepository implements IUsersRepository {
  private repository: User[] = [];

  constructor(repository: User[]) {
    this.repository = repository;
  }

  async exists(email: string): Promise<boolean> {
    const user = this.repository.find((user) => user.email.value === email);

    if (!user) {
      return false;
    }

    return true;
  }
}

export default InMemoryUsersRepository;
