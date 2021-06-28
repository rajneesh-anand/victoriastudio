import React, { useEffect, useState } from "react";
import MovieCard from "../../../components/movie/movie-card";

const BlogContainer = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await fetch("/api/movie");
    const resdata = await res.json();
    if (resdata.msg === "success") {
      setLoading(false);
      setMovieData(resdata.data);
    }
  }, []);

  return loading ? (
    <div className="hv-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
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
