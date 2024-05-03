import "dotenv/config";
import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { readFile } from "node:fs/promises";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";

import { resolvers } from "./resolvers.js";
import { authMiddleware, handleLogin } from "./auth.js";

const port = process.env.PORT;
const environment = process.env.ENVIRONMENT;
const hosturl = process.env.LOCAL_HOST_URL;
const graphqlPathName = process.env.GRAPHQL_PATH_NAME;

const app = express();

const typeDefs = await readFile("./schema.graphql", "utf8");

const apolloServer = new ApolloServer({ typeDefs, resolvers });

await apolloServer.start();

app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);
app.use("/graphql", apolloMiddleware(apolloServer));

app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `GraphQL Server running on ${hosturl}:${port}/${graphqlPathName}`
  );
});
