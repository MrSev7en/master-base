import type { Socket } from 'net';
import { User } from '../data/user';
import { SearchUserPacket } from '../packets/SearchUser';
import { StaticPackets } from '../packets/Static';

export const SearchUserHandler = async (
  socket: Socket,
  buffer: Buffer,
): Promise<boolean | void> => {
  const { search, username } = SearchUserPacket.deserialize(buffer);
  const find = User.get(search);
  const user = User.get(username);

  if (!user) {
    return socket.write(StaticPackets.userNotFound());
  }

  if (user.banned) {
    return socket.write(StaticPackets.userIsBanned());
  }

  if (user.online || user.joining) {
    return socket.write(StaticPackets.userIsOnline());
  }

  if (!find) {
    return socket.write(StaticPackets.unknownUser());
  }

  if (!find.online && !find.joining) {
    return socket.write(StaticPackets.userIsOffline());
  }

  const first = SearchUserPacket.serialize(String(find.online || find.joining));

  socket.write(first);
};
