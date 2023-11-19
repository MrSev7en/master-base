import { User } from './data/user';
import { Gateway } from './gateway';
import dotenv from 'dotenv';

async function bootstrap(): Promise<void> {
  await reset();
  await initialize();
}

async function reset(): Promise<void> {
  User.unsync();

  for (const user of User.list()) {
    User.update(user.username, { online: null });
  }
}

async function initialize(): Promise<void> {
  const { IP, PORT } = process.env;
  const gateway = new Gateway(String(IP), Number(PORT));

  await gateway.listen();
}

dotenv.config();
bootstrap();
