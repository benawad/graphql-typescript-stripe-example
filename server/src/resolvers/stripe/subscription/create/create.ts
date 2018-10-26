import { stripe } from "../../stripe";
import { User } from "../../User";

// TODO: extract into smaller functions for composition and more readable code!
export const create = async (
  _: any,
  { source, ccLast4 }: any,
  { req }: any
) => {
  if (!req.session || !req.session.userId) {
    throw new Error("not authenticated");
  }

  const user = await User.findOne(req.session.userId);

  if (!user) {
    throw new Error();
  }

  let stripeId = user.stripeId;

  if (!stripeId) {
    const customer = await stripe.customers.create({
      email: user.email,
      source,
      plan: process.env.PLAN
    });
    stripeId = customer.id;
  } else {
    // update customer
    await stripe.customers.update(stripeId, {
      source
    });
    await stripe.subscriptions.create({
      customer: stripeId,
      items: [
        {
          plan: process.env.PLAN!
        }
      ]
    });
  }

  user.stripeId = stripeId;
  user.type = "paid";
  user.ccLast4 = ccLast4;
  await user.save();

  return user;
};
