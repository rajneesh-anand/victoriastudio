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

const Account = ({ blogData }) => {
  const [session] = useSession();
  const data = blogData.length != 0 ? JSON.parse(blogData) : null;

  if (!session) {
    return (
      <Layout>
        <SEO
          title="My Account | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/user/account"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <div className="hv-center">
              <p>Please SignIn To Access Your Account </p>
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
      <SEO
        title="My Account | Victoria Studio "
        canonical={process.env.PUBLIC_URL + "/user/account"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <div className="row anchorList">
              <div className="col-4 col-lg-3 col-md-3 ">
                <Link href="/user/newpost">
                  <div className="buttonCol">
                    <a>Write New Blog</a>
                  </div>
                </Link>
              </div>
              <div className="col-4 col-lg-3 col-md-3 ">
                <Link href="/user/account">
                  <div className="buttonCol">
                    <a>Published Blogs</a>
                  </div>
                </Link>
              </div>
              <div className="col-4 col-lg-3 col-md-3 ">
                <Link href="/user/upload/photo">
                  <div className="buttonCol">
                    <a>Upload Photo</a>
                  </div>
                </Link>
              </div>
              <div className="col-4 col-lg-3 col-md-3 ">
                <Link href="/user/upload/video">
                  <div className="buttonCol">
                    <a>Upload Movie</a>
                  </div>
                </Link>
              </div>
              <div className="col-4 col-lg-3 col-md-3 ">
                <Link href="/user/product">
                  <div className="buttonCol">
                    <a>Upload Product</a>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <BlogContainerDraft data={data} />
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return { props: { blogData: [] } };
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
    props: { blogData: JSON.stringify(drafts) },
  };
};

export default Account;
