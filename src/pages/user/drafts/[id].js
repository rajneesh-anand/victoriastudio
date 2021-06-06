import React, { useState, useEffect } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import htmr from "htmr";
import prisma from "../../../lib/prisma";
import Layout from "../../../components/layouts";
import Container from "../../../components/other/Container";

import { useSession, getSession } from "next-auth/client";

function SinglePostForEdit({ post }) {
  const [html, setHtml] = useState("");
  const [data, setData] = useState({
    category: post.category,
    title: post.title,
  });
  const [session, loading] = useSession();

  const handleEditorChange = (content) => {
    setHtml(content);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  if (loading) {
    return <div>Authenticating ...</div>;
  }

  if (!session) {
    return (
      <>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }
  return (
    <Layout title={`Blogger`} description="Shoes Coat Fan mobile">
      <Container>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={data.category}
        >
          <option value="science"> Sceince</option>
          <option value="sports">Sports</option>
        </select>
        <SunEditor
          setOptions={{
            height: 100,
            buttonList: buttonList.complex,
          }}
          placeholder="Please type here..."
          onChange={handleEditorChange}
          setContents={post.content}
        />

        {/* <button onClick={draftPost}>Draft</button>
        <button onClick={publishPost}>Publish</button> */}
      </Container>
    </Layout>
  );
}
export async function getServerSideProps({ params, req, res }) {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { post: {} } };
  }
  try {
    const { id } = params;
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    console.log(post);
    return {
      props: { post: post },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

export default SinglePostForEdit;
