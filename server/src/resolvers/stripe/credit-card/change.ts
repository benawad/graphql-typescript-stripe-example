import { stripe } from "../stripe";
import { User } from "../User";

export const change = async (
  _: any,
  { source, ccLast4 }: any,
  { req }: any
) => {
  if (!req.session || !req.session.userId) {
    throw new Error("not authenticated");
  }

  const user = await User.findOne(req.session.userId);

  if (!user || !user.stripeId || user.type !== "paid") {
    throw new Error();
  }

  await stripe.customers.update(user.stripeId, { source });

  user.ccLast4 = ccLast4;
  await user.save();

  return user;
};
