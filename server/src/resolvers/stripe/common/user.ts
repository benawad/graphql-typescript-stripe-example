import { validSession, error } from "../../common";

export const findUser = async (req: any, User: any) => {
  const session = validSession(req);
  const { userId } = session;
  const user = await User.findOne(userId);
  return validatedUser(user);
};

export const validatedUser = (user: any) => {
  (!user || !user.stripeId || user.type !== "paid") && error("invalid user");
  return user;
};
