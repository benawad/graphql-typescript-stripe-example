import { validSession, error } from ".";
import { GetUserFn } from "../user";

export const findUser = async (req: any, getUser: GetUserFn) => {
  const session = validSession(req);
  const { userId } = session;
  const user = await getUser(userId);
  return validatedUser(user);
};

export const findPaidUser = async (
  req: any,
  getUser: GetUserFn
): Promise<any> => {
  return validatedPaidUser(await findUser(req, getUser));
};

export const validatedUser = (user: any) => {
  (!user || !user.stripeId) && error("invalid stripe user");
  return user;
};

export const validatedPaidUser = (user: any) => {
  user.type !== "paid" && error("user has not paid");
  return user;
};
