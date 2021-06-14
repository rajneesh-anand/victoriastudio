import React from "react";
import Head from "next/head";

const SEO = ({ title, description, canonical, css, js, image }) => (
  <Head>
    <meta charset="utf-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:site_name" content="Victoria Studio" />
    <meta property="og:url" content={`${canonical}`} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@victoriastudio" />
    <meta name="twitter:creator" content="@victoriastudio" />
    <meta property="og:image" content={process.env.PUBLIC_URL + "/og.png"} />
    <meta name="twitter:image" content={process.env.PUBLIC_URL + "/og.png"} />
    {canonical && <link rel="canonical" href={`${canonical}`} />}
    {js && <script type="text/javascript" src={`${js}`}></script>}
  </Head>
);
export default SEO;
