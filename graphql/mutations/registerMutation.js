import { gql } from "@urql/core";

const REGISTER_MUTATION = gql`
  mutation($username: String!, $password: String!, $email: String!) {
    register(options: { username: $username, password: $password, email: $email }) {
      user {
        username
        id
        email
      }
      errors {
        field
        message
      }
    }
  }
`;

export default REGISTER_MUTATION;
