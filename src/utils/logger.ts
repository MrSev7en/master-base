import { pino } from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true,
      messageFormat: '\x1B[37m{msg}',
    },
  },
});
