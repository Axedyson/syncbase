import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
};

export type Mutation = {
  __typename?: 'Mutation';
  RegisterUser: User;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
};

export type RegisterUserInput = {
  email: Scalars['EmailAddress'];
  image: Scalars['URL'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['EmailAddress'];
  id: Scalars['ID'];
  image: Scalars['URL'];
  name: Scalars['String'];
};

export type RegisterUserMutationVariables = Exact<{
  userInput: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', RegisterUser: { __typename?: 'User', email: string, image: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string }> };


export const RegisterUserDocument = gql`
    mutation RegisterUser($userInput: RegisterUserInput!) {
  RegisterUser(input: $userInput) {
    email
    image
  }
}
    `;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument);
};
export const UsersDocument = gql`
    query Users {
  users {
    id
    name
  }
}
    `;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};