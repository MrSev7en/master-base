import type { Socket } from 'net';
import { Server } from '../data/server';
import { User } from '../data/user';
import { GameServerPacket } from '../packets/GameServer';
import { StaticPackets } from '../packets/Static';
import { wait } from '../utils/wait';

export const GameServerHandler = async (
  socket: Socket,
  buffer: Buffer,
): Promise<boolean | void> => {
  const { name, username, port } = GameServerPacket.deserialize(buffer);
  const { first, second, third } = GameServerPacket.serialize();
  const user = User.get(username);
  const server = Server.get(name);

  if (!user) {
    return socket.write(StaticPackets.userNotFound());
  }

  if (user.banned) {
    return socket.write(StaticPackets.userIsBanned());
  }

  if (user.online) {
    return socket.write(StaticPackets.userIsOnline());
  }

  if (server) {
    return socket.write(StaticPackets.serverAlreadyExists());
  }

  socket.write(first);
  await wait(2500);

  socket.write(second);
  await wait(2500);

  socket.write(third);

  User.update(username, { online: name });
  Server.add({ socket, name, port });
};
