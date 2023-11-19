import type { Socket } from 'net';
import { User } from '../data/user';
import { StaticPackets } from '../packets/Static';
import { ServerListPacket } from '../packets/ServerList';
import { wait } from '../utils/wait';

export const ServerListHandler = async (
  socket: Socket,
  buffer: Buffer,
): Promise<boolean | void> => {
  const { username } = ServerListPacket.deserialize(buffer);
  const list = ServerListPacket.serialize({ socket });
  const user = User.get(username);

  if (!user) {
    return socket.write(StaticPackets.userNotFound());
  }

  if (user.banned) {
    return socket.write(StaticPackets.userIsBanned());
  }

  if (user.online) {
    return socket.write(StaticPackets.userIsOnline());
  }

  for await (const packet of list) {
    socket.write(packet);
    await wait(50);
  }
};
