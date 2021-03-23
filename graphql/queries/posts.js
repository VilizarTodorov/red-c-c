import { gql } from "@urql/core";

const POSTS_QUERY = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      posts {
        id
        title
        textSnippet
        createdAt
        updatedAt
        points
        creator{
          id
          username
        }
      }
      hasMore
    }
  }
`;

export default POSTS_QUERY;
