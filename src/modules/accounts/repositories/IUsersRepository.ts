import { User } from '../entities';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
}
