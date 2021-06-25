import React from "react";
import ScrollToTop from "../../components/scroll-to-top";
import SEO from "../../components/seo";
import ContactContainer from "../../containers/contact";
import MapContainer from "../../containers/global/map";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const Contact = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO
          title="Contact | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/contact"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <ContactContainer />
            <MapContainer />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Contact;
