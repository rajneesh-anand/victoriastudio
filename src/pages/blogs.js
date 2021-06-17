import React from "react";
import BlogContainer from "../containers/blog/blog-grid";
import PageTitleContainerTwo from "../containers/global/page-title-two";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import Layout from "../layouts";

const Blogs = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO title="Victoria Studio | Blog" />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <PageTitleContainerTwo
              subTitle="Our Blog"
              title="Write &amp; Share"
            />
            <BlogContainer />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Blogs;
