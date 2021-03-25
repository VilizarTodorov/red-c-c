import Head from "next/head";
import styles from "../styles/Home.module.css";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";
import { useMutation, useQuery } from "urql";
import POSTS_QUERY from "../graphql/queries/posts";
import Layout from "../components/Layout";
import { Fragment, useState } from "react";
import VOTE_MUTATION from "../graphql/mutations/voteMutation";
import { DOWN_DOOT_VALUE, UP_DOOT_VALUE } from "../constants/values";
import ME_QUERY from "../graphql/queries/me";
import NextLink from "next/link";
import { CREATE_POST, LOGIN, REGISTER } from "../constants/routes";

const Home = () => {
  const [meResult] = useQuery({ query: ME_QUERY });
  const [variables, setVariables] = useState({ limit: 10, cursor: null });
  const [result, reexecuteQuery] = useQuery({ query: POSTS_QUERY, variables });
  const { data, fetching, error } = result;

  const [updatedData, vote] = useMutation(VOTE_MUTATION);

  const updoot = (post) => {
    return async () => {
      if (post.voteStatus === 1) {
        return;
      }
      const r = await vote({ value: UP_DOOT_VALUE, postId: post.id });
    };
  };

  const downdoot = (post) => {
    return async () => {
      if (post.voteStatus === -1) {
        return;
      }
      const r = await vote({ value: DOWN_DOOT_VALUE, postId: post.id });
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
          <nav>
            {meResult.data?.me ? (
              <Fragment>
                <span>{meResult.data.me.username}</span>
                <button onClick={() => logout()}>logout</button>
              </Fragment>
            ) : (
              <Fragment>
                <NextLink href={LOGIN}>
                  <a>login</a>
                </NextLink>
                <NextLink href={REGISTER}>
                  <a>register</a>
                </NextLink>
              </Fragment>
            )}
            <NextLink href={CREATE_POST}>
              <a>create post</a>
            </NextLink>
          </nav>
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
                  <p style={{ color: post.voteStatus === 1 && "green" }} onClick={updoot(post)}>
                    updoot
                  </p>
                  <p style={{ color: post.voteStatus === -1 && "red" }} onClick={downdoot(post)}>
                    downdoot
                  </p>
                </div>
              );
            })
          )}
          {data?.posts?.hasMore && (
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
