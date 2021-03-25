import { gql } from "@urql/core";

const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;

export default DELETE_POST_MUTATION;
