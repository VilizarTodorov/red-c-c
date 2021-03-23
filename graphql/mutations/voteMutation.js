import { gql } from "@urql/core";

const VOTE_MUTATION = gql`
  mutation Vote($value: Int!, $postId: Int!) {
    vote(value: $value, postId: $postId)
  }
`;

export default VOTE_MUTATION