import { error } from "./error";

export const validatedSession = (session: any) => {
  (!session || !session.userId) && error("not authenticated");
  return session;
};

export const validSession = (req: any) => {
  return validatedSession(req.session);
};
