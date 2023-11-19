import { User } from '../data/user';
import { LeaveServerPacket } from '../packets/LeaveServer';
import { unparseId } from '../utils/id';
import { logger } from '../utils/logger';

export const LeaveServerHandler = async (
  buffer: Buffer,
): Promise<boolean | void> => {
  if (buffer[3] === 0x4c) {
    const { id } = LeaveServerPacket.deserialize(buffer);
    const users = User.list();
    const user = users.find((user) => user.id === unparseId(id));

    if (user) {
      User.update(user.username, { online: null, joining: null });
      logger.info(`User '${user.username}' left from '${user.online}'`);
    }
  }
};
