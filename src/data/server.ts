import type { Socket } from 'net';
import { reset } from '../utils/uncolorize';

export class Server {
  /* Game properties */

  /** Client socket. */
  public socket!: Socket;

  /** Server name inside game. */
  public name!: string;

  /** Server port. */
  public port!: number;

  /* Global properties */

  private static servers: Server[] = [];

  public static exists(name: string): boolean {
    return this.servers.some((server) => reset(server.name) === reset(name));
  }

  public static get(name: string): Server | undefined {
    return this.servers.find((server) => reset(server.name) === reset(name));
  }

  public static list(): Server[] {
    return this.servers;
  }

  public static add(server: Server): void {
    this.servers.push(server);
  }

  public static remove(name: string): void {
    this.servers = this.servers.filter(
      (server) => reset(server.name) !== reset(name),
    );
  }

  public static update(name: string, server: Partial<Server>): void {
    this.servers = this.servers.map((s) =>
      reset(s.name) === reset(name) ? { ...s, ...server } : s,
    );
  }
}
