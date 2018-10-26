import { User } from "./User";
import * as bcrypt from "bcryptjs";

export const login = async (_: any, { email, password }: any, { req }: any) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return null;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return null;
  }

  req.session.userId = user.id;

  return user;
};
