import { gql } from "@urql/core";

const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: Int!, $title: String!, $text: String!) {
    updatePost(id: $id, title: $title, text: $text) {
      id
      title
      text
      textSnippet
    }
  }
`;

export default UPDATE_POST_MUTATION;
