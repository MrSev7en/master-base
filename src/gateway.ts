import type { Socket } from 'net';
import { createServer } from 'net';
import { Server } from './data/server';
import { User } from './data/user';
import { PacketReader } from './encoders/PacketReader';
import { ConnectServerHandler } from './handlers/ConnectServer';
import { GameServerHandler } from './handlers/GameServer';
import { ServerListHandler } from './handlers/ServerList';
import { ServerPingHandler } from './handlers/ServerPing';
import { logger } from './utils/logger';

export class Gateway {
  public constructor(private ip: string, private port: number) {}

  public async listen(): Promise<void> {
    const server = createServer((socket) => {
      socket.on('data', async (data): Promise<void> => {
        await this.onData(socket, data);
      });

      socket.on('close', async (): Promise<void> => {
        await this.onClose(socket);
      });

      socket.on('error', async (): Promise<void> => {
        await this.onClose(socket);
      });

      socket.on('timeout', async (): Promise<void> => {
        await this.onClose(socket);
      });
    });

    server.listen(this.port);
    logger.info(`Gateway started on '${this.ip}:${this.port}'`);
  }

  private async onData(socket: Socket, buffer: Buffer): Promise<void> {
    logger.info(`Received from ${socket.remoteAddress}:${socket.remotePort}`);
    logger.info(`(${buffer[0]}) | ${buffer.toString('hex')}`);

    const reader = new PacketReader(buffer);
    const opcode = reader.readUInt8();

    switch (opcode) {
      case 1:
        await ServerPingHandler(socket);
        break;

      case 76:
        const type = reader.skip(5).readInt32();

        // TODO: Testar "opcode" & "type" do DCon.

        switch (type) {
          case 128:
            await ServerListHandler(socket, buffer);
            break;

          case 129:
            await ConnectServerHandler(socket, buffer);
            break;

          case 130:
            await GameServerHandler(socket, buffer);
            break;
        }
        break;
    }
  }

  private async onClose(socket: Socket): Promise<void> {
    const servers = Server.list();
    const server = servers.find(
      (server) =>
        server.socket.remoteAddress === socket.remoteAddress &&
        server.socket.remotePort === socket.remotePort,
    );

    if (server) {
      const users = User.online(server.name);

      for (const user of users) {
        User.update(user.username, { online: null });
      }

      Server.remove(server.name);
      logger.info(`Server disconnected '${server.name}'`);
    }
  }
}
