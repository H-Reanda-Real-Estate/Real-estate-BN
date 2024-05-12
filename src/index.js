// server.js
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import typeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";

dotenv.config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start(); // Start the Apollo Server

  server.applyMiddleware({ app });

  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

  app.listen({ port: process.env.PORT || 3000 }, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT || 3000}${
        server.graphqlPath
      }`
    );
  });
};

startServer();
