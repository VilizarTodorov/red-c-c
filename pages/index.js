import Head from "next/head";
import styles from "../styles/Home.module.css";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";
import { useQuery } from "urql";
import POSTS_QUERY from "../graphql/queries/posts";
import Layout from "../components/Layout";

const Home = () => {
  const [result, reexecuteQuery] = useQuery({ query: POSTS_QUERY });
  const { data, fetching, error } = result;

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
            data.posts.map((post) => {
              return <div key={post.id}>{post.title}</div>;
            })
          )}
        </Layout>
      </main>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
