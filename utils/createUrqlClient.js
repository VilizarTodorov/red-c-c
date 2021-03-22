import { cacheExchange } from "@urql/exchange-graphcache";
import router from "next/router";
import { dedupExchange, errorExchange, fetchExchange, stringifyVariables } from "urql";
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
      keys: {
        PaginatedPosts: () => null,
      },
      resolvers: {
        Query: {
          posts: cursorPagination(),
        },
      },
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

const cursorPagination = () => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isInTheCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey), "posts");
    info.partial = !isInTheCache;
    const result = [];
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey);
      const data = cache.resolve(key, "posts");
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore;
      }
      result.push(...data);
    });
    
    return { posts: result, hasMore, __typename: "PaginatedPosts" };
  };
};

export default createUrqlClient;
