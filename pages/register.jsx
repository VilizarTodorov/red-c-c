import { gql } from "@urql/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

const REGISTER_MUTATION = gql`
  mutation($username: String!, $password: String!, $email: String!) {
    register(options: { username: $username, password: $password, email: $email }) {
      user {
        username
        id
        email
      }
      errors {
        field
        message
      }
    }
  }
`;

const Register = (props) => {
  const form = useForm();
  const [updatedData, register] = useMutation(REGISTER_MUTATION);

  const onSubmit = async (data) => {
    const result = await register(data);
    console.log(result);
    console.log((form.errors.errors = result.data.register.errors));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" name="username" placeholder="Username" ref={form.register({ required: true })} />
      {form.errors.username && <p>Username is required</p>}

      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" placeholder="Password" ref={form.register()} />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" placeholder="email" ref={form.register()} />

      <button>submit</button>
    </form>
  );
};

export default Register;
