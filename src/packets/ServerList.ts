import type { Socket } from 'net';
import { Server } from '../data/server';
import { PacketReader } from '../encoders/PacketReader';
import { PacketWriter } from '../encoders/PacketWriter';
import { parseIp } from '../utils/ip';

export class ServerListPacket {
  public static deserialize(buffer: Buffer): {
    username: string;
  } {
    const reader = new PacketReader(buffer);
    const username = reader.skip(41).readString(24);

    return { username };
  }

  public static serialize({ socket }: { socket: Socket }): Buffer[] {
    const writers: PacketWriter[] = [];
    const servers = Server.list();
    const chunks: Buffer[] = [];

    if (servers.length) {
      const writer = new PacketWriter(9);

      writer.writeUInt8(0x08);
      writer.writeUInt8(0x14);
      writer.setOffset(5);
      writer.writeUInt16(servers.length, true);
      writer.setOffset(8);
      writer.writeUInt8(0x00);

      writers.push(writer);

      for (const server of servers) {
        const writer = new PacketWriter(8);

        if (
          parseIp(server.socket.remoteAddress) === parseIp(socket.remoteAddress)
        ) {
          writer.writeBuffer(parseIp(socket.remoteAddress));
        } else {
          writer.writeBuffer(parseIp(server.socket.remoteAddress));
        }

        writer.writeUInt16(server.port, true);
        writer.writeUInt8(0x08);
        writer.writeUInt8(0x00);

        chunks.push(writer.getBuffer());
      }

      for (let i = 0; i < chunks.length / 30; i++) {
        const writer = new PacketWriter(241);
        const list = chunks.slice(i * 30, i * 30 + 30);

        writer.writeUInt8(0xf0);

        for (const chunk of list) {
          writer.writeBuffer(chunk);
        }

        writers.push(writer);
      }
    } else {
      const writer = new PacketWriter(9);

      writer.writeUInt8(0x08);
      writer.writeUInt8(0x14);
      writer.setOffset(8);
      writer.writeUInt8(0xf0);

      writers.push(writer);
    }

    return writers.map((writer) => writer.getBuffer());
  }
}
