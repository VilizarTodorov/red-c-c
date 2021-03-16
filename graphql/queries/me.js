import { gql } from "@urql/core";
import USER_FRAGMENT from "../fragments/userFragment";

const ME_QUERY = gql`
  ${USER_FRAGMENT}
  query {
    me {
      ...UserFragment
    }
  }
`;

export default ME_QUERY;
