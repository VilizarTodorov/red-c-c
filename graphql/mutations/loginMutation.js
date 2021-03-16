import { gql } from "@urql/core";
import USER_FRAGMENT from "../fragments/userFragment";

const LOGIN_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
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

export default LOGIN_MUTATION;
