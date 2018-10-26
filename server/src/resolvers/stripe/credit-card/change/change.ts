import { stripe } from "../../stripe";
import { User } from "../../User";
import { findPaidUser } from "../../common/user";

const updateCustomer = async (stripeId: string, source: any) => {
  await stripe.customers.update(stripeId, { source });
};

const updateUser = async (user: any, ccLast4: any) => {
  user.ccLast4 = ccLast4;
  await user.save();
  return user;
};

export const change = async (
  _: any,
  { source, ccLast4 }: any,
  { req }: any
) => {
  const user = await findPaidUser(req, User);
  await updateCustomer(user.stripeId, source);
  return updateUser(user, ccLast4);
};
