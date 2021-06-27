import React, { useEffect, useState } from "react";
import MovieCard from "../../../components/movie/movie-card";
import { movieData } from "../../../utils/movielist";

const BlogContainer = () => {
  // const [movieData, setMovieData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // "https://nodappserver.herokuapp.com/api/upload"

  // useEffect(async () => {
  //   const res = await fetch("http://localhost:8080/api/video");
  //   const data = await res.json();
  //   console.log(data);

  //   if (data.msg === "success") {
  //     setLoading(false);
  //     setMovieData(data.result);
  //   }
  // }, []);

  return (
    <div className="blog-area blog-masonry-area">
      <div className="container">
        <div className="row post-items-style1">
          {movieData &&
            movieData.map((movie) => (
              <div
                key={movie.id}
                className={"col-sm-6 col-md-6 col-lg-3 "}
                style={{ marginTop: "10px" }}
              >
                <MovieCard data={movie} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogContainer;
