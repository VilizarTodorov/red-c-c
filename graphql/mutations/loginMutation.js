import { gql } from "@urql/core";
import USER_FRAGMENT from "../fragments/userFragment";
import ERROR_FRAGMENT from "../fragments/errorFragment";

const LOGIN_MUTATION = gql`
  ${USER_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      user {
        ...UserFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
`;

export default LOGIN_MUTATION;
