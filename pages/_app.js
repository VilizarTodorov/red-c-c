import "../styles/globals.css";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import ME_QUERY from "../graphql/queries/me";

function temp(cache, qi, result, fn) {
  return cache.updateQuery(qi, (data) => fn(result, data));
}

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            login: (_result, args, cache, info) => {
              temp(cache, { query: ME_QUERY }, _result, (result, query) => {
                if (result.login.errors) {
                  console.log("a");
                  return query;
                } else {
                  console.log("");
                  return {
                    me: result.login.user,
                  };
                }
              });
            },
            register: (result, args, cache, info) => {},
          },
        },
      }),
      fetchExchange,
    ],
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
