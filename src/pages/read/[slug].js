import PropTypes from "prop-types";
import React from "react";
import prisma from "../../lib/prisma";

import BlogDetailsContainer from "../../containers/blog/blog-details";
// import BlogData from "../data/blog.json";
import Link from "next/link";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import ScrollToTop from "../../components/scroll-to-top";

import { useSession, getSession } from "next-auth/client";

const BlogDetails = ({ data }) => {
  const result = JSON.parse(data);

  return (
    <Layout>
      <SEO title={result.title} />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <BlogDetailsContainer data={result} />
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </Layout>
  );
};

BlogDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

export async function getServerSideProps({ params, req, res }) {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { post: {} } };
  }
  try {
    const { slug } = params;
    console.log(slug);
    const post = await prisma.post.findFirst({
      where: {
        slug: slug,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    console.log(post);
    return {
      props: { data: JSON.stringify(post) },
    };
  } catch (error) {
    console.log(error);
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

export default BlogDetails;
