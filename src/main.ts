import { Gateway } from './gateway';
import { User } from './data/user';
import dotenv from 'dotenv';

async function bootstrap(): Promise<void> {
  await reset();
  await initialize();
}

async function reset(): Promise<void> {
  User.unsync();

  for (const user of User.list()) {
    User.update(user.username, { online: null, joining: null });
  }
}

async function initialize(): Promise<void> {
  const { IP, PORT } = process.env;
  const gateway = new Gateway(String(IP) || '0.0.0.0', Number(PORT) || 29339);

  await gateway.listen();
}

dotenv.config();
bootstrap();
