import { validSession, error } from ".";

export const findUser = async (req: any, User: any) => {
  const session = validSession(req);
  const { userId } = session;
  const user = await User.findOne(userId);
  return validatedUser(user);
};

export const findPaidUser = async (req: any, User: any): Promise<any> => {
  return validatedPaidUser(await findUser(req, User));
};

export const validatedUser = (user: any) => {
  (!user || !user.stripeId) && error("invalid stripe user");
  return user;
};

export const validatedPaidUser = (user: any) => {
  user.type !== "paid" && error("user has not paid");
  return user;
};
