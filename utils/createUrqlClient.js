import { cacheExchange } from "@urql/exchange-graphcache";
import router from "next/router";
import { dedupExchange, errorExchange, fetchExchange } from "urql";
import { LOGIN } from "../constants/routes";
import ME_QUERY from "../graphql/queries/me";

const createUrqlClient = (ssrExchange) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (result, args, cache, info) => {
            cache.updateQuery({ query: ME_QUERY }, (data) => {
              return {
                me: null,
              };
            });
          },
          login: (result, args, cache, info) => {
            cache.updateQuery({ query: ME_QUERY }, (data) => {
              if (result.login.errors) {
                return data;
              } else {
                return {
                  me: result.login.user,
                };
              }
            });
          },
          register: (result, args, cache, info) => {
            cache.updateQuery({ query: ME_QUERY }, (data) => {
              if (result.register.errors) {
                return data;
              } else {
                return {
                  me: result.register.user,
                };
              }
            });
          },
        },
      },
    }),
    errorExchange({
      onError: (error, operation) => {
        if (error?.message.includes("not authenticated")) {
          router.push(LOGIN);
        }
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});

export default createUrqlClient;
