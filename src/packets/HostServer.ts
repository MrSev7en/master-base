import { PacketReader } from '../encoders/PacketReader';
import { PacketWriter } from '../encoders/PacketWriter';

export class HostServerPacket {
  public static deserialize(buffer: Buffer): {
    name: string;
    port: number;
  } {
    const reader = new PacketReader(buffer);
    const name = reader.skip(9).readString(32);
    const port = reader.setOffset(73).readUInt16(true);

    return { name, port };
  }

  public static serialize(): { first: Buffer; second: Buffer; third: Buffer } {
    const writerFirst = new PacketWriter(5);
    const writerSecond = new PacketWriter(9);
    const writerThird = new PacketWriter(61);

    writerFirst.writeUInt8(0x04);

    writerSecond.writeUInt8(0x08);
    writerSecond.writeUInt8(0x4d);
    writerSecond.writeUInt8(0x47);
    writerSecond.writeUInt8(0x53);

    writerThird.writeUInt8(0x3c);
    writerThird.writeUInt8(0x4d);
    writerThird.writeUInt8(0x48);
    writerThird.writeUInt8(0x43);

    return {
      first: writerFirst.getBuffer(),
      second: writerSecond.getBuffer(),
      third: writerThird.getBuffer(),
    };
  }
}
