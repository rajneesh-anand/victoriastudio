import React from "react";
import { useSession, getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import Link from "next/link";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import ScrollToTop from "../../../components/scroll-to-top";
import BlogContainerDraft from "../../../containers/blog/blog-draft";

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
    props: { data: JSON.stringify(drafts) },
  };
};

const Drafts = ({ data }) => {
  const [session] = useSession();
  const blogData = JSON.parse(data);

  function truncate(str, no_words) {
    return str.split(" ").splice(0, no_words).join(" ");
  }

  if (!session) {
    return (
      <Layout>
        <SEO
          title="Drafts | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/user/drafts"}
        />
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
      <SEO title="Victoria Studio - Account" />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <div style={{ paddingTop: 10 }}>
              <Link href="/user/newpost">
                <a className="anchor-button-color">Write New Blog</a>
              </Link>
              <Link href="/user/account">
                <a className="anchor-button-color">Published Blog</a>
              </Link>
            </div>
          </div>

          <BlogContainerDraft data={blogData} />
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </Layout>
  );
};

export default Drafts;
