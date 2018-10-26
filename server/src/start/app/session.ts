import * as session from "express-session";
export const createSession = (app: any) => {
  app.use(
    session({
      secret: "asdjlfkaasdfkjlads",
      resave: false,
      saveUninitialized: false
    })
  );
};
