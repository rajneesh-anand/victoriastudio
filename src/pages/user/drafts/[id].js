import React, { useState, useEffect } from "react";
import prisma from "../../../lib/prisma";
import Link from "next/link";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import ScrollToTop from "../../../components/scroll-to-top";

import { useSession, getSession } from "next-auth/client";

function SinglePostForEdit({ post }) {
  const blogData = JSON.parse(post);

  const [data, setData] = useState({
    title: blogData.title,
    content: blogData.content,
  });
  const [session, loading] = useSession();

  if (!session) {
    return (
      <Layout>
        <SEO title="Victoria Studio - Account" />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <div className="text-center-black">
              <p>Please Sign In to upload photos </p>
              <Link href="/auth/signin">
                <a>Sign In</a>
              </Link>
            </div>
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <SEO title="Victoria Studio - Blog" />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div>
            <img
              src={blogData.image}
              alt={blogData.title}
              width={250}
              height={280}
            />
            <form method="POST">
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Blog Title ..."
              />

              <input
                type="text"
                name="content"
                value={data.content}
                onChange={(e) => setData({ ...data, content: e.target.value })}
                placeholder="Blog Content ..."
              />

              {/* <button onClick={draftPost}>Draft</button>
              <button onClick={publishPost}>Publish</button> */}
            </form>
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
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
      props: { post: JSON.stringify(post) },
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
