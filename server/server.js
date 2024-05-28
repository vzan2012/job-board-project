import "dotenv/config";
import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { readFile } from "node:fs/promises";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";

import { resolvers } from "./resolvers.js";
import { authMiddleware, handleLogin } from "./auth.js";
import { getUser } from "./db/users.js";
import { createCompanyLoader } from "./db/companies.js";

const port = process.env.PORT;
const environment = process.env.ENVIRONMENT;
const hosturl = process.env.LOCAL_HOST_URL;
const graphqlPathName = process.env.GRAPHQL_PATH_NAME;

const app = express();

const typeDefs = await readFile("./schema.graphql", "utf8");

const apolloServer = new ApolloServer({ typeDefs, resolvers });

await apolloServer.start();

/**
 * Get User Context
 *
 * @async
 * @param {{ req: any; }} param0
 * @param {*} param0.req
 * @returns {unknown}
 */
const getContext = async ({ req }) => {
  const companyLoader = createCompanyLoader();

  const context = { companyLoader };
  if (req.auth) {
    context.user = await getUser(req.auth.sub);
  }
  return context;
};

app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);
app.use(
  `/${graphqlPathName}`,
  apolloMiddleware(apolloServer, {
    context: getContext,
  })
);

app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `GraphQL Server running on ${hosturl}:${port}/${graphqlPathName}`
  );
});
