import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import correlationId from "express-correlation-id";
import { corsURL, port } from "./config";
import routes from "./routes";
import { logger } from "./core/logger";
import morgan from "morgan";
import { connect } from "./database";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: corsURL, optionsSuccessStatus: 200 }));
app.use(correlationId());
//datasbase Conenction
connect();

//Logger
app.use(
  morgan("tiny", {
    skip: (req) =>
      req.method === "OPTIONS" ||
      req.url === "/health" ||
      req.baseUrl === "/health",
    stream: {
      write: (message) => {
        logger.info(message.substring(0, message.lastIndexOf("\n")));
      },
    },
  })
);

app.use("/", routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  res.status(err.status).json(err.message);
});
export default app;
