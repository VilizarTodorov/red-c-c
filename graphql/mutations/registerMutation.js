import { gql } from "@urql/core";
import USER_FRAGMENT from "../fragments/userFragment";

const REGISTER_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(options: { username: $username, password: $password, email: $email }) {
      user {
        ...UserFragment
      }
      errors {
        field
        message
      }
    }
  }
`;

export default REGISTER_MUTATION;
