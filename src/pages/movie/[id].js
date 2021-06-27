import PropTypes from "prop-types";
import React from "react";
import ReactJWPlayer from "react-jw-player";
import Link from "next/link";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import { movieData } from "../../utils/movielist";
import { useRouter } from "next/router";

const MoviePlayerPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const data = movieData.find((x) => x.slug === id);
  const { slug, name, poster, media } = data;

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
  // : (
  //   <Layout>
  //     <SEO title="Blog link broken" canonical={process.env.PUBLIC_URL} />
  //     <div className="wrapper home-default-wrapper">
  //       <Header classOption="hb-border" />
  //       <div className="main-content">
  //         <div className="container">
  //           <div className="hv-center">
  //             <p>Nothing Here ...</p>
  //           </div>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   </Layout>
  // );
};

MoviePlayerPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

// export async function getServerSideProps({ params, req, res }) {
//   try {
//     const { id } = params;
//     console.log(id);
//     const res = await fetch(`http://localhost:8080/api/video/${id}/movie`);
//     const data = await res.data;
//     console.log(res);

//     if (!data) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: { data: res },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

export default MoviePlayerPage;
