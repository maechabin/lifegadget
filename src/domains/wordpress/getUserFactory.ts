import { User } from './';

export function getUserFactory(users: User[]) {
  return (authorId: number): User | undefined => users.find((user: User) => user.id === authorId);
}
