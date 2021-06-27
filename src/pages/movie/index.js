import React from "react";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import MovieContainer from "../../containers/movie/movie-grid";

const Blogs = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO
          title="Movie | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/movie"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <MovieContainer />
          </div>
          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Blogs;
