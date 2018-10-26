import { User } from "../../User";
import { findUser } from "../common";
import { stripe } from "../stripe";

const deleteCard = async (user: any, stripeCustomer: any) => {
  await stripe.customers.deleteCard(
    user.stripeId,
    stripeCustomer.default_source as string
  );
};

const deleteSubscription = async (subscription: any) => {
  await stripe.subscriptions.del(subscription.id);
};

const getCustomerSubscription = (stripeCustomer: any) => {
  const [subscription] = stripeCustomer.subscriptions.data;
  return subscription;
};

const setUserType = async (user: any, type: string = "free-trial") => {
  user.type = type;
  await user.save();
  return user;
};

const retrieveStripeCustomer = async (user: any) => {
  return await stripe.customers.retrieve(user.stripeId);
};

export const cancel = async (_: any, __: any, { req }: any) => {
  const user = await findUser(req, User);
  const stripeCustomer = await retrieveStripeCustomer(user);
  const subscription = getCustomerSubscription(stripeCustomer);
  await deleteSubscription(subscription);
  await deleteCard(user, stripeCustomer);
  return await setUserType(user, "free-trial");
};
