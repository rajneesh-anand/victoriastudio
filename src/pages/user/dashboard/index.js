import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/layouts";
import Container from "../../../components/other/Container";
import Loading from "../../../components/other/Loading";

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

const Dashboard = (props) => {
  const [session, loading] = useSession();
  if (loading) {
    return <Loading />;
  }

  const unpublishBlog = async (id) => {
    await fetch(`http://localhost:3000/api/unpublish/${id}`, {
      method: "PUT",
    });
    await Router.push("/user/dashboard");
  };

  //   useEffect(() => {}, [props]);
  if (!session) {
    return (
      <Layout title="Blogger" description="Shoes Coat Fan mobile">
        <Container>
          <div>You need to be authenticated to view this page.</div>
        </Container>
      </Layout>
    );
  }
  return (
    <Layout title="Blogger Dashboard" description="Shoes Coat Fan mobile">
      <Container>
        <h1>Blogs</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <small>By {post.author.name}</small>
              <button onClick={() => unpublishBlog(post.id)}>Un-Publish</button>
              <Link href={`/user/drafts/${post.id}`}>
                <a>Edit</a>
              </Link>
            </div>
          ))}
        </main>
      </Container>
    </Layout>
  );
};

export default Dashboard;
