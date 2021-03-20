import { gql } from "@urql/core";

const POSTS_QUERY = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      id
      createdAt
      title
      text
      points
      title
      creatorId
    }
  }
`;

export default POSTS_QUERY;
