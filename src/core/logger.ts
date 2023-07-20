import winston, { Logger, Logform } from "winston";
import correlation from "express-correlation-id";
import { environment } from "../config";

class LoggerUtils {
  private static instance: Logger;

  private getLogger(): Logger {
    return winston.createLogger({
      level: environment === "development" ? "debug" : "info",
      format: winston.format.combine(
        winston.format((info) => {
          info.correlationId = correlation.getId() || "";
          return info;
        })(),
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.printf(this.logTransform)
      ),
      transports: [new winston.transports.Console()],
      exitOnError: false,
    });
  }

  static getInstance(): Logger {
    if (!LoggerUtils.instance) {
      const loggerUtils = new LoggerUtils();
      LoggerUtils.instance = loggerUtils.getLogger();
    }

    return LoggerUtils.instance;
  }

  private logTransform = (info: Logform.TransformableInfo): string => {
    const { level, message, timestamp, correlationId } = info;
    return `${timestamp} -${correlationId}- ${level}: ${message}`;
  };
}

const logger = LoggerUtils.getInstance();

export { Logger, logger };
