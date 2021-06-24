import PropTypes from "prop-types";
import Link from "next/link";
import htmr from "htmr";

import { slugify } from "../../../utils";

const BlogCard = ({ data }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const truncate = (str, no_words) => {
    return htmr(str.split(" ").splice(0, no_words).join(" "));
  };

  const cate = data.categories.map((value, i) => {
    return (
      <Link
        className="category"
        href={process.env.PUBLIC_URL + `/category/${slugify(value)}`}
        key={i}
      >
        <a>{value}</a>
      </Link>
    );
  });

  return (
    <section>
      <div
        className="card img-fluid"
        style={{
          backgroundImage: data.image
            ? `url(${data.image})`
            : "url('https://source.unsplash.com/600x900/?tech,street')",
          cursor: "pointer",
        }}
      >
        <Link href={process.env.PUBLIC_URL + `/read/${data.id}/${data.slug}`}>
          <div className="card-img-overlay">
            <div className="blog-title">{data.title}</div>
            <hr style={{ color: "antiquewhite" }} />
            <div className="blog-content">{truncate(data.content, 20)}</div>
            <div> {formatDate(data.createdAt)}</div>

            <div className="card-footer">
              <div className="media">
                <img
                  className="mr-3 rounded-circle"
                  src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/male-512.png"
                  alt="Generic placeholder image"
                  style={{ maxWidth: "50px" }}
                />
                <div className="media-body">
                  <h6 className="my-0 text-white d-block">
                    {data.author.name}
                  </h6>
                  <small className="my-0 text-dark d-block">
                    Author / Blogger{" "}
                  </small>
                </div>
              </div>
              <a className="blue-button">Read..</a>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

BlogCard.propTypes = {
  data: PropTypes.object,
};

export default BlogCard;
