import Head from "next/head";
import styles from "../styles/Home.module.css";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";
import { useMutation, useQuery } from "urql";
import POSTS_QUERY from "../graphql/queries/posts";
import Layout from "../components/Layout";
import { useState } from "react";
import VOTE_MUTATION from "../graphql/mutations/voteMutation";
import { DOWN_DOOT_VALUE, UP_DOOT_VALUE } from "../constants/values";

const Home = () => {
  const [variables, setVariables] = useState({ limit: 10, cursor: null });
  const [result, reexecuteQuery] = useQuery({ query: POSTS_QUERY, variables });
  const { data, fetching, error } = result;

  const [updatedData, vote] = useMutation(VOTE_MUTATION);

  const updoot = (postId) => {
    return async () => {
      const r = await vote({ value: UP_DOOT_VALUE, postId });
      console.log(r);
    };
  };

  const downdoot = (postId) => {
    return async () => {
      const r = await vote({ value: DOWN_DOOT_VALUE, postId });
      console.log(r);
    };
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Layout>
          <h1>Hello World</h1>
          {!data ? (
            <div>...loading</div>
          ) : (
            data.posts.posts.map((post) => {
              return (
                <div style={{ border: "1px solid" }} key={post.id}>
                  <h2>{post.title}</h2>
                  <h4>posted by: {post.creator.username}</h4>
                  <p>{post.textSnippet}</p>
                  <p>points: {post.points}</p>
                  <p onClick={updoot(post.id)}>updoot</p>
                  <p onClick={downdoot(post.id)}>downdoot</p>
                </div>
              );
            })
          )}
          {data?.posts?.posts.hasMore && (
            <button
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
                });
              }}
            >
              load more
            </button>
          )}
        </Layout>
      </main>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
