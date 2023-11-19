import type { Socket } from 'net';
import { StaticPackets } from '../packets/Static';

export const ServerPingHandler = async (socket: Socket): Promise<void> => {
  socket.write(StaticPackets.serverPing());
};
