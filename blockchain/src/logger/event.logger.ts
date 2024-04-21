const winston = require('winston');
const { combine, timestamp, label, printf, json } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const eventLogger = winston.createLogger({
  format: combine(label({ label: 'Event' }), timestamp(), myFormat, json()),
  transports: [
    //new winston.transports.File({ filename: 'event.log', level: 'info' }),
    new winston.transports.File({
      filename: 'event-error.log',
      level: 'error',
    }),
  ],
});
