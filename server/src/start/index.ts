import { connectDb } from "./connect-db";
import { createApp } from "./app";

export const start = async () => {
  connectDb();
  createApp();
};
