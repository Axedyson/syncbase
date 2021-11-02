import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: number;
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
  logout?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryLogoutArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type RegisterUserInput = {
  email: Scalars['EmailAddress'];
  image: Scalars['URL'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  email: Scalars['EmailAddress'];
  id: Scalars['ID'];
  image: Scalars['URL'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RegisterUserMutationVariables = Exact<{
  userInput: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', RegisterUser: { __typename?: 'User', createdAt: number, email: string, image: string, name: string, id: string } };

export type UserFieldsFragment = { __typename?: 'User', id: string };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout?: boolean | null | undefined };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
}
    `;
export const RegisterUserDocument = gql`
    mutation RegisterUser($userInput: RegisterUserInput!) {
  RegisterUser(input: $userInput) {
    ...UserFields
    createdAt
    email
    image
    name
  }
}
    ${UserFieldsFragmentDoc}`;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument);
};
export const LogoutDocument = gql`
    query Logout {
  logout(id: 2)
}
    `;

export function useLogoutQuery(options: Omit<Urql.UseQueryArgs<LogoutQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LogoutQuery>({ query: LogoutDocument, ...options });
};