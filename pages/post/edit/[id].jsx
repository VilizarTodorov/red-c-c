import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import Layout from "../../../components/Layout";
import POST_QUERY from "../../../graphql/queries/post";
import createUrqlClient from "../../../utils/createUrqlClient";
import UPDATE_POST_MUTATION from "../../../graphql/mutations/updatePostMutation";
import { HOME } from "../../../constants/routes";

const EditPost = (props) => {
  const router = useRouter();
  const [{ data }] = useQuery({ query: POST_QUERY, variables: { id: parseInt(router.query.id) } });
  const [updatedData, updatePost] = useMutation(UPDATE_POST_MUTATION);
  const form = useForm();

  if (!data) {
    return <div>...loading</div>;
  }

  const onSubmit = async (data) => {
    await updatePost({ id: parseInt(router.query.id), title: data.title, text: data.text });
    router.push(HOME);
  };

  return (
    <Layout>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="New Tittle"
          defaultValue={data.post.title}
          ref={form.register({ required: true })}
        />
        {form.errors.title && <p>Title is required</p>}

        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          type="text"
          name="text"
          placeholder="New Text"
          defaultValue={data.post.text}
          ref={form.register({ required: true })}
        />
        {form.errors.text && <p>Text is required</p>}

        <button>submit</button>
      </form>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(EditPost);
