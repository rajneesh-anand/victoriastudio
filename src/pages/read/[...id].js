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

const BlogDetails = ({ data }) => {
  const result = JSON.parse(data);

  return result ? (
    <Layout>
      <SEO
        title={result.title}
        canonical={process.env.PUBLIC_URL + `/read/${result.id}/${result.slug}`}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <BlogDetailsContainer data={result} />
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </Layout>
  ) : (
    <Layout>
      <SEO title="Blog link broken" canonical={process.env.PUBLIC_URL} />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <p>Nothing Here ...</p>
          </div>
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
  try {
    const { id } = params;

    const post = await prisma.post.findFirst({
      where: {
        AND: [
          {
            id: Number(id[0]),
            slug: id[1],
          },
        ],
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
