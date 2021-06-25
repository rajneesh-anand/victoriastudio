import PropTypes from "prop-types";
import Link from "next/link";
import htmr from "htmr";
import { useSession } from "next-auth/client";

import { slugify } from "../../../utils";

const BlogCard = ({ data }) => {
  const [session] = useSession();
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
            <div className="blog-content">{truncate(data.content, 35)}</div>
            <div> {formatDate(data.createdAt)}</div>

            <div className="card-footer">
              <div className="media">
                <img
                  className="mr-3 rounded-circle"
                  src={data.author.image}
                  alt="profile image"
                  style={{ width: "40px", height: "40px" }}
                />
                <div
                  className="media-body"
                  style={{
                    paddingLeft: "5px",
                    fontSize: "12px",
                  }}
                >
                  <p className="my-0 text-white d-block">{data.author.name}</p>
                  <p className="my-0 text-dark d-block">Author | Blogger </p>
                </div>
              </div>
              <a className="blue-button">Read More</a>
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
