import { gql } from "@urql/core";

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export default FORGOT_PASSWORD_MUTATION;
