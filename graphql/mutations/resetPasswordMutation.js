import { gql } from "@urql/core";
import USER_FRAGMENT from "../fragments/userFragment";
import ERROR_FRAGMENT from "../fragments/errorFragment";

const RESET_PASSWORD_MUTATION = gql`
  ${USER_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation ResetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token) {
      user {
        ...UserFragment
      }
      errors {
        ...ErrorFragment
      }
    }
  }
`;

export default RESET_PASSWORD_MUTATION;
