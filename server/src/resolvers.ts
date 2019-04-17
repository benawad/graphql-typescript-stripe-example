import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";

import { User } from "./entity/User";
import { Book } from "./entity/Book";
import { pubsub } from "./pubsub";

const NEW_BOOK = "NEW_BOOK";

export const resolvers: IResolvers = {
  Subscription: {
    newBook: {
      subscribe: (_, __, { connection }) => {
        if (!connection.context.req.session.userId) {
          throw new Error("not authed");
        }

        return pubsub.asyncIterator([NEW_BOOK]);
      }
    }
  },
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
    createBook: async (_, { name }, { req }) => {
      if (!req.session.userId) {
        throw new Error("not authenticated");
      }

      const book = await Book.create({ name }).save();

      pubsub.publish(NEW_BOOK, { newBook: book });

      return book;
    }
  }
};
