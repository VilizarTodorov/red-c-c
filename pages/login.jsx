import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import LOGIN_MUTATION from "../graphql/mutations/loginMutation";
import { useRouter } from "next/router";
import { HOME } from "../constants/routes";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";
import ForgottenPasswordLink from "../components/ForgottenPassowrdLink";

const Login = (props) => {
  const router = useRouter();
  const form = useForm();
  const [updatedData, login] = useMutation(LOGIN_MUTATION);

  const onSubmit = async (data) => {
    const result = await login(data);
    console.log(result);
    console.log((form.errors.errors = result.data.login.errors));
    router.push(HOME);
  };

  return (
    <Fragment>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          ref={form.register({ required: true })}
        />
        {form.errors.username && <p>Username is required</p>}

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" placeholder="Password" ref={form.register()} />

        <button>submit</button>
      </form>
      <ForgottenPasswordLink></ForgottenPasswordLink>
    </Fragment>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
