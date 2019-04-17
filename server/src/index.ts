import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import * as http from "http";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  await createConnection();

  const app = express();

  const sessionMiddleware = session({
    secret: "asdjlfkaasdfkjlads",
    resave: false,
    saveUninitialized: false
  });

  app.use(sessionMiddleware);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res, connection }: any) => ({ req, res, connection }),
    subscriptions: {
      onConnect: (_, ws: any) => {
        return new Promise(res =>
          sessionMiddleware(ws.upgradeReq, {} as any, () => {
            res({ req: ws.upgradeReq });
          })
        );
      }
    }
  });

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000"
    }
  }); // app is from an existing express app

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
