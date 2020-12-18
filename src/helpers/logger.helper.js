import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const timezoned = () => {
  return new Date().toLocaleString('vi', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
};

const logFormat = format.combine(
  format.timestamp({ format: timezoned }),
  format.json()
);
const transport = new DailyRotateFile({
  filename: path.resolve(__dirname, 'logs', `%DATE%.log`),
  dirname: './logs/',
  datePattern: 'DD-MM-YYYY',
  maxSize: '20m',
  maxFiles: '14d',
  // level: 'error',
  // zippedArchive: true,
  // prepend: true,
  // handleExceptions: true,
  // json: true,
});

const logger = createLogger({
  format: logFormat,
  transports: [transport, new transports.Console()],
});

export default (data) => {
  logger.error(data);
};
