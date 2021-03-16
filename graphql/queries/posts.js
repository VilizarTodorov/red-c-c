import { gql } from "@urql/core";

const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      title
    }
  }
`;

export default POSTS_QUERY;
