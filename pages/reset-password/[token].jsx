import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../../utils/createUrqlClient";
import RESET_PASSWORD_MUTATION from "../../graphql/mutations/resetPasswordMutation";
import { HOME } from "../../constants/routes";

const ResetPassword = (props) => {
  const router = useRouter();
  const form = useForm();
  const [updatedData, resetPassword] = useMutation(RESET_PASSWORD_MUTATION);

  console.log(router.query.token);

  const onSubmit = async (data) => {
    const result = await resetPassword({ newPassword: data.newPassword, token: router.query.token });
    console.log(result);
    router.push(HOME);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <label htmlFor="username">New Password</label>
      <input
        id="newPassword"
        type="password"
        name="newPassword"
        placeholder="New Password"
        ref={form.register({ required: true })}
      />
      {form.errors.password && <p>Password is required</p>}

      <label htmlFor="repeatPassword">Repeat Password</label>
      <input
        id="repeatPassword"
        type="password"
        name="repeatPassword"
        placeholder="Repeat Password"
        ref={form.register()}
      />

      <button>submit</button>
    </form>
  );
};

export default withUrqlClient(createUrqlClient)(ResetPassword);
