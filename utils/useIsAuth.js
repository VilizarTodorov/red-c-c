import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";
import { LOGIN } from "../constants/routes";
import ME_QUERY from "../graphql/queries/me";
import isServerSide from "./isServerSide";

export const useIsAuth = () => {
  const [result, reexecuteQuery] = useQuery({ query: ME_QUERY, pause: isServerSide() });
  const { data, fetching, error } = result;
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace({
        query: {
          from: router.pathname,
        },
        pathname: LOGIN,
      });
    }
  }, [fetching, data, router]);
};
