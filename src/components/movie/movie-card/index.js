import PropTypes from "prop-types";
import Link from "next/link";

const MovieCard = ({ data }) => {
  console.log(data);

  return (
    <div className="card">
      <div className="card-header-img">
        <img
          src={
            data.poster
              ? data.poster
              : "https://source.unsplash.com/600x900/?tech,street"
          }
          alt="rover"
        />
      </div>
      <div className="card-body-movie">
        <span className="tag tag-teal">{data.name}</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {data.duration}

          <div className="playButton">
            <Link href={`/movie/${data.slug}`}>
              <a>
                PLAY MOVIE <i className="icofont-play-alt-1 icofont-2x" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  data: PropTypes.object,
};

export default MovieCard;
