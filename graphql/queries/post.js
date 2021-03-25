import { gql } from "@urql/core";

const POST_QUERY = gql`
  query Post($id: Int!) {
    post(id: $id) {
      id
      title
      text
      points
      voteStatus
      creator {
        id
        username
      }
    }
  }
`;

export default POST_QUERY;
