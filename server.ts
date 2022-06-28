import cors from "cors";
import express from "express";
import http from "http";
import { env } from "process";
import { logger } from "./logger";

export const app = express();
const server = new http.Server(app);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next();
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL!],
  })
);

app.use(express.static("public"));
app.use(express.static("public", { extensions: ["html"] }));

app.set("trust proxy", 1);
const PORT = env.PORT;

server.listen(PORT, () => {
  logger.info(`The server is ready: http://localhost:${PORT}/`);
});
