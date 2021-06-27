import React from "react";
import ReactJWPlayer from "react-jw-player";
import Link from "next/link";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import { movieData } from "../../utils/movielist";
import { useRouter } from "next/router";

const MoviePlayerPage = ({ data }) => {
  const { slug, name, media, poster } = data;
  return (
    <Layout>
      <SEO title={name} canonical={process.env.PUBLIC_URL + `/movie/${slug}`} />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <ReactJWPlayer
              playerId="studionmovieonline"
              playerScript="https://cdn.jwplayer.com/libraries/QoEEgjta.js"
              file={media}
              image={poster}
            />

            {/* <div className="row">
              <div className="player">
                <video controls autoPlay crossOrigin="anonymous">
                  <source
                    src={`http://localhost:8080/api/video/${slug}`}
                    type="video/mp4"
                  />
                  <track
                    label="English"
                    kind="captions"
                    srcLang="en"
                    src={`http://localhost:8080/api/video/${slug}/caption`}
                    default
                  />
                </video>
              </div>
            </div> */}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const data = movieData.find((x) => x.slug === id);
  console.log(data);

  return {
    props: { data: data },
  };
}

export default MoviePlayerPage;
