import React from "react";
import { BackTop } from "antd";
import Header from "./header";
// import Footer from "./footer";

import { SEO } from "../seo";

const Layout = ({
  title,
  description,
  children,

}) => {

  return (
    <>
      <SEO title={title} description={description} />
      <Header />
      <div className="content">{children}</div>
      <BackTop />
    </>
  );
};

export default React.memo(Layout);
