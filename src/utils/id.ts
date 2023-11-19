export const parseId = (id: number): Buffer =>
  Buffer.from(
    Buffer.from(id.toString(16).padStart(6, '0'), 'hex')
      .toString('hex')
      .slice(-6),
    'hex',
  );

export const unparseId = (id: Buffer): number =>
  parseInt(id.toString('hex'), 16);
