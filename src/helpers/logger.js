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
  datePattern: 'YYYY-MM-DD',
  level: 'info',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  prepend: true,
});

const logger = createLogger({
  format: logFormat,
  transports: [transport, new transports.Console({ level: 'info' })],
});

export default (data) => {
  logger.info(data);
};
