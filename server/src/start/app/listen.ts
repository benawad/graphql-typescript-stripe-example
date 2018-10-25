import { server } from "./server";

type Config = {
  host?: string;
  port?: number;
  log?: any;
};

export const listen = (
  app: any,
  { host = "localhost", port = 4000, log = console.log }: Config = {}
) => {
  app.listen({ port }, () =>
    log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`)
  );
};
