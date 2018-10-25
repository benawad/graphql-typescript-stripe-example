import { server } from "./server";
export const addCors = (app: any) => {
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000"
    }
  }); // app is from an existing express app
};
