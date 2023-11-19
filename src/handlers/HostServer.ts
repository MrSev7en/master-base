import type { Socket } from 'net';
import { Server } from '../data/server';
import { HostServerPacket } from '../packets/HostServer';
import { StaticPackets } from '../packets/Static';
import { wait } from '../utils/wait';

export const HostServerHandler = async (
  socket: Socket,
  buffer: Buffer,
): Promise<boolean | void> => {
  const { name, port } = HostServerPacket.deserialize(buffer);
  const { first, second, third } = HostServerPacket.serialize();
  const server = Server.get(name);

  if (server) {
    return socket.write(StaticPackets.serverAlreadyExists());
  }

  socket.write(first);
  await wait(2500);

  socket.write(second);
  await wait(2500);

  socket.write(third);

  Server.add({ socket, name, port });
};
