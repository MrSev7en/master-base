import { User } from '../data/user';
import { JoinServerPacket } from '../packets/JoinServer';
import { logger } from '../utils/logger';

export const JoinServerHandler = async (
  buffer: Buffer,
): Promise<boolean | void> => {
  const { username } = JoinServerPacket.deserialize(buffer);
  const user = User.get(username);

  if (user) {
    User.update(user.username, { online: user.joining, joining: null });
    logger.info(`User '${user.username}' joined into '${user.joining}'`);
  }
};
