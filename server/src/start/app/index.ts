import * as express from "express";
import { createSession } from "./session";
import { addCors } from "./cors";
import { listen } from "./listen";

export const createApp = () => {
  const app = express();
  createSession(app);
  addCors(app);
  listen(app);
};
