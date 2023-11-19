export const parseId = (id: Number): Buffer =>
  Buffer.from(String(id).padEnd(3, '0'), 'hex');
