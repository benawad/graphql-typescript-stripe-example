import { stripe } from "../../stripe";
import { findPaidUser } from "../../common/user";
import { getUser } from "../../user";

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
  const user = await findPaidUser(req, getUser);
  await updateCustomer(user.stripeId, source);
  return updateUser(user, ccLast4);
};
