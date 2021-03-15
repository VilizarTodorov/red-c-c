import { gql } from "@urql/core";

const ME_QUERY = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;

export default ME_QUERY;
