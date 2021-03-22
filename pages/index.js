import Head from "next/head";
import styles from "../styles/Home.module.css";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";
import { useQuery } from "urql";
import POSTS_QUERY from "../graphql/queries/posts";
import Layout from "../components/Layout";
import { useState } from "react";

const Home = () => {
  const [variables, setVariables] = useState({ limit: 10, cursor: null });
  const [result, reexecuteQuery] = useQuery({ query: POSTS_QUERY, variables });
  const { data, fetching, error } = result;
  console.log(data);

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
                  <p>{post.textSnippet}</p>
                </div>
              );
            })
          )}
          {data.posts.hasMore && (
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
