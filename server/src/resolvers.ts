import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";

import { User } from "./entity/User";
import { stripe } from "./stripe";

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }

      return User.findOne(req.session.userId);
    }
  },
  Mutation: {
    logout: async (_, __, { req, res }) => {
      await new Promise(res => req.session.destroy(() => res()));
      res.clearCookie("connect.sid");
      return true;
    },
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword
      }).save();

      return true;
    },
    login: async (_, { email, password }, { req }) => {
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
    },
    createSubcription: async (_, { source, ccLast4 }, { req }) => {
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
    },
    changeCreditCard: async (_, { source, ccLast4 }, { req }) => {
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
    },
    cancelSubscription: async (_, __, { req }) => {
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
    }
  }
};
