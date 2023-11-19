import type { Socket } from 'net';
import { Server } from '../data/server';
import { User } from '../data/user';
import { PacketReader } from '../encoders/PacketReader';
import { PacketWriter } from '../encoders/PacketWriter';
import { parseIp } from '../utils/ip';
import { parseId } from '../utils/id';

export class ConnectServerPacket {
  public static deserialize(buffer: Buffer): {
    name: string;
    username: string;
  } {
    const reader = new PacketReader(buffer);
    const name = reader.skip(9).readString(32);
    const username = reader.skip(41).readString(24);

    return { name, username };
  }

  public static serialize({
    socket,
    user,
    server,
  }: {
    socket: Socket;
    user: User;
    server: Server;
  }): {
    first: Buffer;
    second: Buffer;
  } {
    const id = parseId(user.id);
    const writerFirst = new PacketWriter(33);
    const writerSecond = new PacketWriter(21);

    writerFirst.writeUInt8(0x20);
    writerFirst.writeString(user.username);
    writerFirst.setOffset(25);
    writerFirst.writeBuffer(id);
    writerFirst.skip(1);
    writerFirst.writeBuffer(id);

    writerSecond.writeUInt8(0x14);
    writerSecond.writeUInt8(0x08);
    writerSecond.writeUInt8(0x00);
    writerSecond.writeUInt16(server.port, true);

    if (
      parseIp(server.socket.remoteAddress) === parseIp(socket.remoteAddress)
    ) {
      writerSecond.writeBuffer(parseIp(socket.remoteAddress));
    } else {
      writerSecond.writeBuffer(parseIp(server.socket.remoteAddress));
    }

    writerSecond.writeBuffer(id);
    writerSecond.skip(1);
    writerSecond.writeBuffer(id);

    return {
      first: writerFirst.getBuffer(),
      second: writerSecond.getBuffer(),
    };
  }
}
