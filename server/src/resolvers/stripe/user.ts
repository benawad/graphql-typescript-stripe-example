import { User } from "../User";

export type GetUserFn = (userId: string) => Promise<User | undefined>;

export const getUser = async (userId: string): Promise<User | undefined> => {
  return await User.findOne(userId);
};
