import { Connection } from "typeorm";

import { graphqlTestCall } from "./graphqlTestCall";
import { createTestConn } from "./createTestConn";
import { User } from "./entity/User";

const registerMutation = `
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

const loginMutation = `
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      type
      ccLast4
    }
  }
`;

const meQuery = `
  query MeQuery {
    me {
      id
      email
      type
      ccLast4
    }
  }
`;

let conn: Connection;

beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
});

describe("resolvers", () => {
  it("register, login, and me", async () => {
    const testUser = { email: "bob@bob.com", password: "bobby" };

    const registerResponse = await graphqlTestCall(registerMutation, {
      email: testUser.email,
      password: testUser.email
    });

    expect(registerResponse).toEqual({ data: { register: true } });

    const dbUser = await User.findOne({ where: { email: testUser.email } });

    expect(dbUser).toBeDefined();

    const loginResponse = await graphqlTestCall(loginMutation, {
      email: testUser.email,
      password: testUser.email
    });

    expect(loginResponse).toEqual({
      data: {
        login: {
          id: `${dbUser!.id}`,
          email: dbUser!.email,
          type: dbUser!.type,
          ccLast4: dbUser!.ccLast4
        }
      }
    });

    const meResponse = await graphqlTestCall(meQuery, {}, dbUser!.id);

    expect(meResponse).toEqual({
      data: {
        me: {
          id: `${dbUser!.id}`,
          email: dbUser!.email,
          type: dbUser!.type,
          ccLast4: dbUser!.ccLast4
        }
      }
    });
  });
});
