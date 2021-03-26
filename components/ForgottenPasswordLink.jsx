import NextLink from "next/link";
import React from "react";
import { FORGOTTEN_PASSWORD } from "../constants/routes";

const ForgottenPasswordLink = (props) => {
  return (
    <NextLink href={FORGOTTEN_PASSWORD}>
      <a>Forgot your password ?</a>
    </NextLink>
  );
};

export default ForgottenPasswordLink;
