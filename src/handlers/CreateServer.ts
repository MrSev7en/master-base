import type { Socket } from 'net';
import { Server } from '../data/server';
import { User } from '../data/user';
import { CreateServerPacket } from '../packets/CreateServer';
import { StaticPackets } from '../packets/Static';
import { wait } from '../utils/wait';

export const CreateServerHandler = async (
  socket: Socket,
  buffer: Buffer,
): Promise<boolean | void> => {
  const { name, username, port } = CreateServerPacket.deserialize(buffer);
  const { first, second, third } = CreateServerPacket.serialize();
  const user = User.get(username);
  const server = Server.get(name);

  if (username) {
    if (!user) {
      return socket.write(StaticPackets.userNotFound());
    }

    if (user.banned) {
      return socket.write(StaticPackets.userIsBanned());
    }

    if (user.online || user.joining) {
      return socket.write(StaticPackets.userIsOnline());
    }
  }

  if (server) {
    return socket.write(StaticPackets.serverAlreadyExists());
  }

  socket.write(first);
  await wait(2500);

  socket.write(second);
  await wait(2500);

  socket.write(third);

  if (user) {
    User.update(username, { online: name });
  }

  Server.add({ socket, name, port });
};
