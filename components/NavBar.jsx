import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useMutation, useQuery } from "urql";
import { CREATE_POST, LOGIN, REGISTER } from "../constants/routes";
import LOGOUT_MUTATION from "../graphql/mutations/logoutMutation";
import ME_QUERY from "../graphql/queries/me";
import createUrqlClient from "../utils/createUrqlClient";

const NavBar = () => {
  const router = useRouter();
  const [updatedData, logout] = useMutation(LOGOUT_MUTATION);
  const [result, reexecuteQuery] = useQuery({ query: ME_QUERY });
  const { data, fetching, error } = result;

  return (
    <nav>
      {data?.me ? (
        <Fragment>
          <span>{data.me.username}</span>
          <button
            onClick={async () => {
              await logout();

              router.reload();
            }}
          >
            logout
          </button>
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
  );
};

export default withUrqlClient(createUrqlClient)(NavBar);
