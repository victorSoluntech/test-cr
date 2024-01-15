//import { createLogger, format, transports } from "winston";

const winston = require('winston');
const createLogger = winston.createLogger;
//const util = require("util");
const format = winston.format;
const transports = winston.transports;

const {
  combine,
  timestamp,
  label,
  prettyPrint,
  printf,
  metadata,
  errors,
  colorize
} = format;

const options = {
  // level: "debug",
  format: combine(
    //label({ label: xxxxx }),
    // colorize(), //does cause error printing levels

    errors({ stack: true }), // <-- use errors format
    timestamp(),

    prettyPrint()
  ),

  transports: [
    new transports.File({
      filename: 'log.combined.log',
      level: 'debug',
      maxsize: 9000000, // 5MB
      maxFiles: 2
    }) //REMIND: change to LEVEL TO INFO  in production
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'log.exceptions.log',
      maxsize: 5000000, // 5MB
      maxFiles: 2
    })
  ]
};

const logger = createLogger(options);

module.exports = logger;