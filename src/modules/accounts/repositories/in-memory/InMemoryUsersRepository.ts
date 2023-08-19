import User from '@modules/accounts/entities/user';

import { IUsersRepository } from '../IUsersRepository';

class InMemoryUsersRepository implements IUsersRepository {
  private repository: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.repository.find((user) => user.email.value === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create({ name, email, password }: User): Promise<void> {
    const user = new User(name, email, password);

    this.repository.push(user);
  }
}

export default InMemoryUsersRepository;
