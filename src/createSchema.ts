import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
