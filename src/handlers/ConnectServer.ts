import type { Socket } from 'net';
import { Server } from '../data/server';
import { User } from '../data/user';
import { ConnectServerPacket } from '../packets/ConnectServer';
import { StaticPackets } from '../packets/Static';
import { wait } from '../utils/wait';

export const ConnectServerHandler = async (
  socket: Socket,
  buffer: Buffer,
): Promise<boolean | void> => {
  const { name, username } = ConnectServerPacket.deserialize(buffer);
  const user = User.get(username);
  const server = Server.get(name);

  if (!user) {
    return socket.write(StaticPackets.userNotFound());
  }

  if (user.banned) {
    return socket.write(StaticPackets.userIsBanned());
  }

  if (user.online || user.joining) {
    return socket.write(StaticPackets.userIsOnline());
  }

  if (!server) {
    return socket.write(StaticPackets.serverNotFound());
  }

  const { first, second } = ConnectServerPacket.serialize(socket, user, server);

  server.socket.write(first);
  await wait(2500);

  socket.write(second);
  User.update(username, { joining: name });
};
