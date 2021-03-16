import React, { Fragment } from "react";
import NextLink from "next/link";
import { LOGIN, REGISTER } from "../constants/routes";
import { useMutation, useQuery } from "urql";
import ME_QUERY from "../graphql/queries/me";
import LOGOUT_MUTATION from "../graphql/mutations/logoutMutation";

const NavBar = () => {
  const [updatedData, logout] = useMutation(LOGOUT_MUTATION);
  const [result, reexecuteQuery] = useQuery({ query: ME_QUERY });
  const { data, fetching, error } = result;

  const temp = async () => {
    const result = await logout();
    console.log(result);
  };

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  console.log(data);

  return (
    <nav>
      {data.me ? (
        <Fragment>
          <span>{data.me.username}</span>
          <button onClick={temp}>logout</button>
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
    </nav>
  );
};

export default NavBar;
