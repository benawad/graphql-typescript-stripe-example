import { IResolvers } from "graphql-tools";
import { me } from "./me";
import { logout } from "./logout";
import { login } from "./login";
import { register } from "./register";
import * as stripe from "./stripe";

export const resolvers: IResolvers = {
  Query: {
    me
  },
  Mutation: {
    logout,
    register,
    login,
    createSubcription: stripe.subscription.create,
    changeCreditCard: stripe.creditCard.change,
    cancelSubscription: stripe.subscription.cancel
  }
};
