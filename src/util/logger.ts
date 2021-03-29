import * as winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf((info) => `${info.timestamp} | ${info.level} | ${info.message}`)),
  transports: [new winston.transports.Console()],
})

export { logger }
