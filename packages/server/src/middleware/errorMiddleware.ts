import { ApolloError } from "apollo-server-errors";
import type { GraphQLError } from "graphql";

export const errorMiddleware = (err: GraphQLError) => {
  console.error(err.originalError);
  // If the error is an apollo error, it means its something we have thrown deliberately
  if (err.originalError instanceof ApolloError) return err;
  // Otherwise we can't know what kind of error it is, it may be a db error leaking
  // sensitive information. To mitigiate that, we will just return a generic error message
  return new Error("Unknown error occurred");
};
