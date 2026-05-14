import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const logsDirectory = path.resolve('logs');
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(logsDirectory, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logsDirectory, 'combined.log') })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: format.combine(format.colorize(), format.simple()) }));
}

const httpLogger = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
});

const requestLogger = (req, res, next) => {
  logger.info('%s %s %s', req.method, req.originalUrl, req.ip);
  next();
};

export { logger, requestLogger, httpLogger };
