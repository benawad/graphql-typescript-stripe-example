import { stripe } from "../../stripe";
import { User } from "../../User";
import { findUser } from "../../common";

const stripeIdFromCustomer = async (
  user: any,
  source: any,
  plan?: string
): Promise<string> => {
  const { email } = user;
  plan = plan || process.env.PLAN;
  const customer = await stripe.customers.create({
    email,
    source,
    plan
  });
  return customer.id;
};

const updateCustomer = async (
  stripeId: string,
  source: any
): Promise<string> => {
  // update customer
  await stripe.customers.update(stripeId, {
    source
  });
  const items = [
    {
      plan: process.env.PLAN!
    }
  ];
  await stripe.subscriptions.create({
    customer: stripeId,
    items
  });
  return stripeId;
};

const updateUser = async (
  user: any,
  stripeId: string,
  ccLast4: any,
  type: string = "paid"
) => {
  user.stripeId = stripeId;
  user.type = type;
  user.ccLast4 = ccLast4;
  await user.save();
  return user;
};

export const create = async (
  _: any,
  { source, ccLast4 }: any,
  { req }: any
) => {
  const user = await findUser(req, User);
  let { stripeId } = user;
  stripeId = stripeId
    ? await stripeIdFromCustomer(user, source)
    : await updateCustomer(stripeId, source);
  await updateUser(user, stripeId, ccLast4, "paid");
  return user;
};
