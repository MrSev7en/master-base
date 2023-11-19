export class PacketWriter {
  private buffer!: Buffer;
  private offset = 0;

  public constructor(length: number) {
    this.buffer = Buffer.alloc(length);
  }

  /**
   * Writes a buffer to the buffer.
   * @param buffer The buffer to write.
   */
  public writeBuffer(buffer: Buffer): void {
    buffer.copy(this.buffer, this.offset);
    this.offset += buffer.length;
  }

  /**
   * Writes a signed 8-bit integer to the buffer. (Byte)
   * @param value The value to write.
   */
  public writeInt8(value: number): void {
    this.buffer.writeInt8(value, this.offset);
    this.offset += 1;
  }

  /**
   * Writes a unsigned 8-bit integer to the buffer. (Byte)
   * @param value The value to write.
   */
  public writeUInt8(value: number): void {
    this.buffer.writeUInt8(value, this.offset);
    this.offset += 1;
  }

  /**
   * Writes a signed 16-bit integer to the buffer. (Short)
   * @param value The value to write.
   * @param littleEndian Whether to write the value as little endian or not.
   */
  public writeInt16(value: number, littleEndian = false): void {
    if (littleEndian) {
      this.buffer.writeInt16LE(value, this.offset);
    } else {
      this.buffer.writeInt16BE(value, this.offset);
    }

    this.offset += 2;
  }

  /**
   * Writes a unsigned 16-bit integer to the buffer. (Short)
   * @param value The value to write.
   * @param littleEndian Whether to write the value as little endian or not.
   */
  public writeUInt16(value: number, littleEndian = false): void {
    if (littleEndian) {
      this.buffer.writeUInt16LE(value, this.offset);
    } else {
      this.buffer.writeUInt16BE(value, this.offset);
    }

    this.offset += 2;
  }

  /**
   * Writes a signed 32-bit integer to the buffer. (Int)
   * @param value The value to write.
   * @param littleEndian Whether to write the value as little endian or not.
   */
  public writeInt32(value: number, littleEndian = false): void {
    if (littleEndian) {
      this.buffer.writeInt32LE(value, this.offset);
    } else {
      this.buffer.writeInt32BE(value, this.offset);
    }

    this.offset += 4;
  }

  /**
   * Writes a unsigned 32-bit integer to the buffer. (Int)
   * @param value The value to write.
   * @param littleEndian Whether to write the value as little endian or not.
   */
  public writeUInt32(value: number, littleEndian = false): void {
    if (littleEndian) {
      this.buffer.writeUInt32LE(value, this.offset);
    } else {
      this.buffer.writeUInt32BE(value, this.offset);
    }

    this.offset += 4;
  }

  /**
   * Writes a string to the buffer.
   * @param value The value to write.
   */
  public writeString(value: string): void {
    this.buffer.write(value, this.offset, value.length, 'utf-8');
    this.offset += value.length;
  }

  /**
   * Writes a boolean to the buffer.
   * @param value The value to write.
   */
  public writeBoolean(value: boolean): void {
    this.buffer.writeUInt8(value ? 1 : 0, this.offset);
    this.offset += 1;
  }

  /**
   * Get the written buffer.
   */
  public getBuffer(): Buffer {
    return this.buffer;
  }

  /**
   * Skips a sequence of bytes from the buffer.
   * @param length The length of the sequence to skip.
   * @returns {PacketWriter}
   */
  public skip(length: number): PacketWriter {
    this.offset += length;

    return this;
  }

  /**
   * Sets the offset of the reader.
   * @param offset The offset to set.
   * @returns {PacketWriter}
   */
  public setOffset(offset: number): PacketWriter {
    this.offset = offset;

    return this;
  }
}
