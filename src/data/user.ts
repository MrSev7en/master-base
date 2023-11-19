import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { reset } from '../utils/uncolorize';

export class User {
  /* Game properties */

  /** User unique id game. */
  public id!: number;

  /** User name inside game. */
  public username!: string;

  /** Name of server that user is online. */
  public online!: string | null;

  /** Name of server that user is joining. */
  public joining!: string | null;

  /** If user is banned. */
  public banned!: boolean;

  /* Global properties */

  private static users: User[] = [];

  public static exists(username: string): boolean {
    this.unsync();
    this.sync();

    return this.users.some((user) => reset(user.username) === reset(username));
  }

  public static get(username: string): User | undefined {
    this.unsync();
    this.sync();

    return this.users.find((user) => reset(user.username) === reset(username));
  }

  public static list(): User[] {
    this.unsync();
    this.sync();

    return this.users;
  }

  public static add(user: User): void {
    this.unsync();
    this.users.push(user);
    this.sync();
  }

  public static remove(username: string): void {
    this.unsync();
    this.users = this.users.filter(
      (user) => reset(user.username) !== reset(username),
    );
    this.sync();
  }

  public static update(username: string, user: Partial<User>): void {
    this.unsync();
    this.users = this.users.map((u) =>
      reset(u.username) === reset(username) ? { ...u, ...user } : u,
    );
    this.sync();
  }

  public static online(name: string): User[] {
    this.unsync();
    this.sync();

    return this.users.filter(
      (user) => user.online && reset(user.online) === reset(name),
    );
  }

  public static unsync(): void {
    this.users = [];
    this.users = JSON.parse(
      readFileSync(join(__dirname, '..', '..', 'data', 'users.json'), {
        encoding: 'utf-8',
      }),
    );
  }

  public static sync(): void {
    writeFileSync(
      join(__dirname, '..', '..', 'data', 'users.json'),
      JSON.stringify(this.users, null, 2),
      { encoding: 'utf-8' },
    );
  }
}
