import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import Layout from "../components/Layout";
import { LOGIN } from "../constants/routes";
import FORGOT_PASSWORD_MUTATION from "../graphql/mutations/forgotPasswordMutation";
import createUrqlClient from "../utils/createUrqlClient";

const Login = (props) => {
  const router = useRouter();
  const form = useForm();
  const [updatedData, forgotPassword] = useMutation(FORGOT_PASSWORD_MUTATION);

  const onSubmit = async (data) => {
    const result = await forgotPassword({ email: data.email });
    console.log(result);
    console.log((form.errors.errors = result.data.forgotPassword.errors));
    router.push(LOGIN);
  };

  return (
    <Layout>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" placeholder="Email" ref={form.register({ required: true })} />
        {form.errors.email && <p>Email is required</p>}

        <button>submit</button>
      </form>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
