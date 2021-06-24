import React from "react";
import { useSession, getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import Link from "next/link";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import ScrollToTop from "../../../components/scroll-to-top";
import BlogContainerTwo from "../../../containers/blog/blog-two";

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
    props: { data: JSON.stringify(drafts) },
  };
};

const Account = ({ data }) => {
  const [session] = useSession();
  const blogData = JSON.parse(data);

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
      <SEO
        title="My Account | Victoria Studio "
        canonical={process.env.PUBLIC_URL + "/user/account"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <div className="row anchorList">
              <div className="col-6 col-md-3 buttonCol">
                <Link href="/user/newpost">
                  <a>Write New Blog</a>
                </Link>
              </div>
              <div className="col-6 col-md-3 buttonCol">
                <Link href="/user/drafts">
                  <a>Drafts List</a>
                </Link>
              </div>
              <div className="col-6 col-md-3 buttonCol">
                <Link href="/user/upload">
                  <a>Upload Photo</a>
                </Link>
              </div>
              <div className="col-6 col-md-3 buttonCol">
                <Link href="/user/product">
                  <a>Upload Product</a>
                </Link>
              </div>
            </div>
          </div>
          <hr />
          <BlogContainerTwo data={blogData} />
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </Layout>
  );
};

export default Account;
