export class PacketReader {
  private offset = 0;

  public constructor(private buffer: Buffer) {}

  /**
   * Reads a signed 8-bit integer from the buffer. (Byte)
   * @returns {number}
   */
  public readInt8(): number {
    const value = this.buffer.readInt8(this.offset);
    this.offset += 1;

    return value;
  }

  /**
   * Reads an unsigned 8-bit integer from the buffer. (Byte)
   * @returns {number}
   */
  public readUInt8(): number {
    const value = this.buffer.readUInt8(this.offset);
    this.offset += 1;

    return value;
  }

  /**
   * Reads a signed 16-bit integer from the buffer. (Short)
   * @param littleEndian Whether to read the value as little endian or not.
   * @returns {number}
   */
  public readInt16(littleEndian?: boolean): number {
    const value = littleEndian
      ? this.buffer.readInt16LE(this.offset)
      : this.buffer.readInt16BE(this.offset);

    this.offset += 2;

    return value;
  }

  /**
   * Reads an unsigned 16-bit integer from the buffer. (Short)
   * @param littleEndian Whether to read the value as little endian or not.
   * @returns {number}
   */
  public readUInt16(littleEndian?: boolean): number {
    const value = littleEndian
      ? this.buffer.readUInt16LE(this.offset)
      : this.buffer.readUInt16BE(this.offset);

    this.offset += 2;

    return value;
  }

  /**
   * Reads a signed 32-bit integer from the buffer. (Integer)
   * @param littleEndian
   * @returns {number}
   */
  public readInt32(littleEndian?: boolean): number {
    const value = littleEndian
      ? this.buffer.readIntLE(this.offset, 2)
      : this.buffer.readIntBE(this.offset, 2);

    this.offset += 2;

    return value;
  }

  /**
   * Reads an unsigned 32-bit integer from the buffer. (Integer)
   * @param littleEndian  Whether to read the value as little endian or not.
   * @returns {number}
   */
  public readUInt32(littleEndian?: boolean): number {
    const value = littleEndian
      ? this.buffer.readUIntLE(this.offset, 2)
      : this.buffer.readUIntBE(this.offset, 2);

    this.offset += 2;

    return value;
  }

  /**
   * Reads a signed 64-bit integer from the buffer. (Long)
   * @param littleEndian Whether to read the value as little endian or not.
   * @returns {bigint}
   */
  public readInt64(littleEndian?: boolean): bigint {
    const value = littleEndian
      ? this.buffer.readBigInt64LE(this.offset)
      : this.buffer.readBigInt64BE(this.offset);

    return value;
  }

  /**
   * Reads an unsigned 64-bit integer from the buffer. (Long)
   * @param littleEndian Whether to read the value as little endian or not.
   * @returns {bigint}
   */
  public readUInt64(littleEndian?: boolean): bigint {
    const value = littleEndian
      ? this.buffer.readBigUInt64LE(this.offset)
      : this.buffer.readBigUInt64BE(this.offset);

    this.offset += 8;

    return value;
  }

  /**
   * Reads a sequence of bytes from the buffer. (String)
   * @param length The length of the string to read.
   * @returns {string}
   */
  public readString(length: number): string {
    if (length > 0) {
      const value = this.buffer.toString(
        'utf8',
        this.offset,
        this.offset + length,
      );
      this.offset += length;

      return value.replace(/\0/g, '');
    } else {
      const value: number[] = [];

      while (
        this.buffer[this.offset] !== 0 &&
        this.offset < this.buffer.length
      ) {
        value.push(this.buffer[this.offset] ?? 0);
        this.offset++;
      }

      return Buffer.from(value).toString('utf8');
    }
  }

  /**
   * Reads a boolean from the buffer. (Boolean)
   * @returns {boolean}
   */
  public readBoolean(): boolean {
    const value = this.buffer.readInt8(this.offset) === 1;
    this.offset += 1;

    return value;
  }

  /**
   * Skips a sequence of bytes from the buffer.
   * @param length The length of the sequence to skip.
   * @returns {PacketReader}
   */
  public skip(length: number): PacketReader {
    this.offset += length;

    return this;
  }

  /**
   * Sets the offset of the reader.
   * @param offset The offset to set.
   * @returns {PacketReader}
   */
  public setOffset(offset: number): PacketReader {
    this.offset = offset;

    return this;
  }
}
