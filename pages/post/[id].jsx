import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "urql";
import createUrqlClient from "../../utils/createUrqlClient";
import POST_QUERY from "../../graphql/queries/post";
import DELETE_POST_MUTATION from "../../graphql/mutations/deletePostMutation";

const Post = (props) => {
  const router = useRouter();
  const [{ data }] = useQuery({ query: POST_QUERY, variables: { id: parseInt(router.query.id) } });
  const [_, deletePost] = useMutation(DELETE_POST_MUTATION);

  if (!data) {
    return <div>...loading</div>;
  }

  return (
    <div style={{ border: "1px solid" }} key={data.post.id}>
      <h2>{data.post.title}</h2>
      <h4>posted by: {data.post.creator.username}</h4>
      <p>{data.post.text}</p>
      <p>points: {data.post.points}</p>
      {/* <p style={{ color: data.post.voteStatus === 1 && "green" }} onClick={updoot(post)}>
      updoot
    </p>
    <p style={{ color: data.post.voteStatus === -1 && "red" }} onClick={downdoot(post)}>
      downdoot
    </p> */}

      <button
        onClick={async () => {
          const result = await deletePost({ id: data.post.id });
          console.log(result);
        }}
      >
        delete post
      </button>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
