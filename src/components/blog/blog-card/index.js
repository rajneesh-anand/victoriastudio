import PropTypes from "prop-types";
import Link from "next/link";

import { slugify } from "../../../utils";

const BlogCard = ({ data }) => {
  console.log(data);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      <div className="container">
        <div className="row">
          <Link href={process.env.PUBLIC_URL + `/read/${data.slug}`}>
            <div>
              <div
                className="card text-white card-has-bg click-col"
                style={{
                  backgroundImage:
                    "url('https://source.unsplash.com/600x900/?tech,street')",
                }}
              >
                <img
                  className="card-img d-none"
                  src="https://source.unsplash.com/600x900/?tech,street"
                  alt="Goverment Lorem Ipsum Sit Amet Consectetur dipisi?"
                />
                <div className="card-img-overlay d-flex flex-column">
                  <div className="card-body">
                    <small className="card-meta mb-2">{cate}</small>
                    <h4 className="card-title mt-0 ">
                      <Link
                        href={process.env.PUBLIC_URL + `/read/${data.slug}`}
                      >
                        <a className="text-white">{data.title}</a>
                      </Link>
                    </h4>
                    <small>
                      <i className="far fa-clock"></i>{" "}
                      {formatDate(data.createdAt)}
                    </small>
                  </div>
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
                        <small>Author / Blogger </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

BlogCard.propTypes = {
  data: PropTypes.object,
};

export default BlogCard;
