import { gql } from "@urql/core";

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        email
        username
      }
    }
  }
`;

export default LOGIN_MUTATION;
