import { PacketWriter } from '../encoders/PacketWriter';

export class StaticPackets {
  public static unknownUser(): Buffer {
    const writer = new PacketWriter(33);

    writer.writeUInt8(0x20);
    writer.writeString('Unknown user name');

    return writer.getBuffer();
  }

  public static userNotFound(): Buffer {
    const writer = new PacketWriter(33);

    writer.writeUInt8(0x20);
    writer.writeString('Your user name was not found');

    return writer.getBuffer();
  }

  public static userIsBanned(): Buffer {
    const writer = new PacketWriter(33);

    writer.writeUInt8(0x20);
    writer.writeString('User name is currently banned');

    return writer.getBuffer();
  }

  public static userIsOnline(): Buffer {
    const writer = new PacketWriter(33);

    writer.writeUInt8(0x20);
    writer.writeString('User name is already online');

    return writer.getBuffer();
  }

  public static userIsOffline(): Buffer {
    const writer = new PacketWriter(33);

    writer.writeUInt8(0x20);
    writer.writeString('The user was not found online');

    return writer.getBuffer();
  }

  public static serverAlreadyExists(): Buffer {
    const writer = new PacketWriter(5);

    writer.writeUInt8(0x04);
    writer.writeUInt8(0x01);

    return writer.getBuffer();
  }

  public static serverNotFound(): Buffer {
    const writer = new PacketWriter(33);

    writer.writeUInt8(0x20);
    writer.writeString('Host not found on master server');

    return writer.getBuffer();
  }

  public static serverPing(): Buffer {
    const writer = new PacketWriter(2);

    writer.writeUInt8(0x01);
    writer.writeUInt8(0x01);

    return writer.getBuffer();
  }
}
