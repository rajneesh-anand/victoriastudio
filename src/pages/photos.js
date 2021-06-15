import Image from "next/image";
import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import Layout from "../layouts";

export default function Photos() {
  const [postDetail, setPostDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  // "https://nodappserver.herokuapp.com/api/upload"

  useEffect(async () => {
    const res = await fetch("https://nodappserver.herokuapp.com/api/upload");
    const data = await res.json();
    console.log(data);
    if (data.msg === "success") {
      setLoading(false);
      setPostDetail(data.result);
    }
  }, []);

  return loading ? (
    <Layout>
      <SEO title="Victoria Studio | Photo Gallery" />
      <div className="wrapper home-default-wrapper">
        <Header />

        <div className="main-content">
          <div className="text-center">
            <h4>Loading.....</h4>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  ) : (
    <Layout>
      <SEO title="Victoria Studio | Upload" />
      <div className="wrapper home-default-wrapper">
        <Header />

        <div className="main-content">
          <div style={{ display: "flex" }}>
            {postDetail.map((post) => (
              <div key={post._id} style={{ margin: 10 }}>
                <img src={post.url} alt={post.resource} />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch("https://nodappserver.herokuapp.com/api/upload");
//   const result = await res.json();

//   return { props: { data: result } };
// }
