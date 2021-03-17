import { gql } from "@urql/core";

const ERROR_FRAGMENT = gql`
  fragment ErrorFragment on FieldError {
    field
    message
  }
`;

export default ERROR_FRAGMENT;
