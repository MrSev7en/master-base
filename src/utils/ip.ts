export const parseIp = (remoteAddress: string | undefined): Buffer => {
  if (!remoteAddress) {
    return Buffer.from('7f000001', 'hex');
  }

  const ip = remoteAddress.replace(/::ffff:/, '');
  const octets = ip.split('.');

  if (octets.length === 4) {
    return Buffer.from(
      octets
        .map((octet) => parseInt(octet).toString(16).padStart(2, '0'))
        .join(''),
      'hex',
    );
  }

  return Buffer.from('7f000001', 'hex');
};
