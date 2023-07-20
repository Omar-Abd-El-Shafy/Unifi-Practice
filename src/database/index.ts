import mongoose from "mongoose";
import { logger } from "../core/logger";
import { mongoConfig } from "../config";

export const connect = () => {
  try {
    const database = mongoConfig.url;
    mongoose.connect(database);

    const { connection } = mongoose;
    connection.on("connected", () => {
      logger.info("Database Connection was Successful");
    });
    connection.on("error", (err) => {
      logger.error(`Database Connection Failed ${err}`);
      throw new Error(err);
    });
    connection.on("disconnected", () =>
      logger.info("Database Connection Disconnected")
    );

    return connection;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
