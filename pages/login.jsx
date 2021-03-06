import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import ForgottenPasswordLink from "../components/ForgottenPasswordLink";
import Layout from "../components/Layout";
import { HOME } from "../constants/routes";
import LOGIN_MUTATION from "../graphql/mutations/loginMutation";
import createUrqlClient from "../utils/createUrqlClient";
// import { useIsAuth } from "../utils/useIsAuth";

const Login = (props) => {
  const router = useRouter();
  const form = useForm();
  const [updatedData, login] = useMutation(LOGIN_MUTATION);

  // useIsAuth();

  const from = () => {
    return router.query.from ? router.query.from : HOME;
  };

  const onSubmit = async (data) => {
    await login(data);
    router.replace(from());
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
