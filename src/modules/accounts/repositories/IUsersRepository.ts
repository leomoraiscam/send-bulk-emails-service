export interface IUsersRepository {
  exists(email: string): Promise<boolean>;
}
