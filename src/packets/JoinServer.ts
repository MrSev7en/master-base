import { PacketReader } from '../encoders/PacketReader';

export class JoinServerPacket {
  public static deserialize(buffer: Buffer): {
    username: string;
  } {
    const reader = new PacketReader(buffer);
    const username = reader.skip(9).readString(24);

    return { username };
  }
}
