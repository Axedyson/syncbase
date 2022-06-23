import { ApolloError } from "apollo-server-errors";
import type { GraphQLError } from "graphql";

export const errorMiddleware = (err: GraphQLError) => {
  console.error(err.originalError);
  // If the error is an apollo error, it means it's something we have thrown deliberately
  // otherwise we can't know what kind of error it is, it may be a db error leaking sensitive
  // information. To mitigate that, we will just return a generic error message
  if (!(err.originalError instanceof ApolloError)) {
    err.message = "common:unknownError";
  }

  return err;
};
