import "reflect-metadata";

require("dotenv").config();

import path from "path";

import { ExpressContext } from "./types";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  keyFilename: path.join(__dirname, "../artisans-platform-0a318c50639c.json"),
  projectId: "artisans-platform",
});

// storage.getBuckets().then((buckets) => console.log("buckets:", buckets));

export const tapFilesBucket = storage.bucket("artisans-platform.appspot.com");

console.log("tapFilesBucket", tapFilesBucket);

import { redis } from "./redis";
import { createSchema } from "./createSchema";

const app = Express();

const RedisStore = connectRedis(session);

const ormConnection = async (): Promise<void> => {
  await createConnection({
    name: "default",
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: ["src/entity/*.*"],
    extra: {
      ssl: process.env.SSL || false,
    },
  });
};

interface Options {
  store: connectRedis.RedisStore;
  name: string;
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
}

const sessionOptions: Options = {
  store: new RedisStore({
    client: redis,
  }),
  name: "qid",
  secret: String(process.env.SECRET),
  resave: false,
  saveUninitialized: false,
};

const message = `Server running on http://localhost:${process.env.PORT}/graphql 🚀`;

const main = async (): Promise<void> => {
  ormConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: ExpressContext): ExpressContext => ({
      req,
      res,
    }),
  });

  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    })
  );

  app.use(session(sessionOptions));

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    setTimeout(() => console.log(message), 750);
  });
};

main();
