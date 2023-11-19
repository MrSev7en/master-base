export class LeaveServerPacket {
  public static deserialize(buffer: Buffer): {
    id: Buffer;
  } {
    const id = buffer.slice(5, 8);

    return { id };
  }
}
