import React from "react";
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
      published: false,
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

const Drafts = (props) => {
  const [session, loading] = useSession();
  if (loading) {
    return <Loading />;
  }

  const publishDraft = async (id) => {
    await fetch(`http://localhost:3000/api/publish/${id}`, {
      method: "PUT",
    });
    await Router.push("/user/dashboard");
  };

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
    <Layout title="Blogger Drafts" description="Shoes Coat Fan mobile">
      <Container>
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <small>By {post.author.name}</small>
              <button onClick={() => publishDraft(post.id)}>Publish</button>
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

export default Drafts;
