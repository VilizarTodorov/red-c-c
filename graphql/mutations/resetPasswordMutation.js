import { gql } from "@urql/core";
import USER_FRAGMENT from "../fragments/userFragment";

const RESET_PASSWORD_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation ResetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token) {
      errors {
        field
        message
      }
      user {
        ...UserFragment
      }
    }
  }
`;

export default RESET_PASSWORD_MUTATION;
