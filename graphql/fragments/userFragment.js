import { gql } from "@urql/core";

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    email
  }
`;

export default USER_FRAGMENT;
