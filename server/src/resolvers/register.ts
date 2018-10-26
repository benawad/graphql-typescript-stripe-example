import { User } from "./User";
import * as bcrypt from "bcryptjs";

export const register = async (_: any, { email, password }: any) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    email,
    password: hashedPassword
  }).save();

  return true;
};
