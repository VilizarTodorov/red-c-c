import { gql } from "@urql/core";

const POSTS_QUERY = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      posts {
        id
        title
        textSnippet
        createdAt
      }
      hasMore
    }
  }
`;

export default POSTS_QUERY;
