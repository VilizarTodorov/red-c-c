import { gql } from "@urql/core";

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export default LOGOUT_MUTATION;
