import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import LOGIN_MUTATION from "../graphql/mutations/loginMutation";

const Login = (props) => {
  const form = useForm();
  const [updatedData, login] = useMutation(LOGIN_MUTATION);

  const onSubmit = async (data) => {
    const result = await login(data);
    console.log(result);
    console.log((form.errors.errors = result.data.login.errors));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" name="username" placeholder="Username" ref={form.register({ required: true })} />
      {form.errors.username && <p>Username is required</p>}

      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" placeholder="Password" ref={form.register()} />

      <button>submit</button>
    </form>
  );
};

export default Login;
