import { stripe } from "../stripe";
import { User } from "../User";

export const cancel = async (_: any, __: any, { req }: any) => {
  if (!req.session || !req.session.userId) {
    throw new Error("not authenticated");
  }

  const user = await User.findOne(req.session.userId);

  if (!user || !user.stripeId || user.type !== "paid") {
    throw new Error();
  }

  const stripeCustomer = await stripe.customers.retrieve(user.stripeId);

  const [subscription] = stripeCustomer.subscriptions.data;

  await stripe.subscriptions.del(subscription.id);

  await stripe.customers.deleteCard(
    user.stripeId,
    stripeCustomer.default_source as string
  );

  user.type = "free-trial";
  await user.save();

  return user;
};
