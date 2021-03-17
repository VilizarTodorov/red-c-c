import { gql } from "@urql/core";
import USER_FRAGMENT from "../fragments/userFragment";
import ERROR_FRAGMENT from "../fragments/errorFragment";

const REGISTER_MUTATION = gql`
  ${USER_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(options: { username: $username, password: $password, email: $email }) {
      user {
        ...UserFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
`;

export default REGISTER_MUTATION;
