import { gql } from "@urql/core";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $text: String!) {
    createPost(options: { title: $title, text: $text }) {
      id
      title
      creatorId
      points
    }
  }
`;

export default CREATE_POST_MUTATION;
