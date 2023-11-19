import { PacketReader } from '../encoders/PacketReader';
import { PacketWriter } from '../encoders/PacketWriter';

export class SearchUserPacket {
  public static deserialize(buffer: Buffer): {
    search: string;
    username: string;
  } {
    const reader = new PacketReader(buffer);
    const search = reader.skip(9).readString(32);
    const username = reader.readString(24);

    return { search, username };
  }

  public static serialize(name: string): Buffer {
    const writer = new PacketWriter(41);

    writer.writeUInt8(0x28);
    writer.writeString(name);

    return writer.getBuffer();
  }
}
