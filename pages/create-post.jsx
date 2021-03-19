import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import CREATE_POST_MUTATION from "../graphql/mutations/createPostMutation";
import { useRouter } from "next/router";
import { HOME } from "../constants/routes";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";

const CreatePost = (props) => {
  const router = useRouter();
  const form = useForm();
    const [updatedData, createPost] = useMutation(CREATE_POST_MUTATION);

  const onSubmit = async (data) => {
    const result = await createPost(data);
    console.log(result);
    console.log((form.errors.errors = result.data.createPost.errors));
    router.push(HOME);
  };

  return (
    <Fragment>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" placeholder="Title" ref={form.register({ required: true })} />
        {form.errors.title && <p>title is required</p>}

        <label htmlFor="Text">Text</label>
        <input id="Text" type="text" name="text" placeholder="text" ref={form.register()} />

        <button>submit</button>
      </form>
    </Fragment>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
