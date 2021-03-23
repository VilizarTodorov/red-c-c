import React, { Fragment } from "react";
import NextLink from "next/link";
import { CREATE_POST, LOGIN, REGISTER } from "../constants/routes";
import { useMutation, useQuery } from "urql";
import ME_QUERY from "../graphql/queries/me";
import LOGOUT_MUTATION from "../graphql/mutations/logoutMutation";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";
import isServerSide from "../utils/isServerSide";

const NavBar = () => {
  const [updatedData, logout] = useMutation(LOGOUT_MUTATION);
  const [result, reexecuteQuery] = useQuery({ query: ME_QUERY, pause: isServerSide() });
  const { data, fetching, error } = result;

  return (
    <nav>
      {data?.me ? (
        <Fragment>
          <span>{data.me.username}</span>
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
  );
};

export default withUrqlClient(createUrqlClient)(NavBar);
