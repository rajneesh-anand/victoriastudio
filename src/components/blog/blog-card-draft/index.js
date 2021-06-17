import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";

const BlogCardTwo = ({ data }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const publishBlog = async (id) => {
    await fetch(`https://nodappserver.herokuapp.com/api/publish/${id}/true`, {
      method: "PUT",
    });
    await Router.push("/user/drafts");
  };

  return (
    <div className="index-content">
      <div className="card">
        <img src={data.image} />
        <h4>{data.title}</h4>
        <h6>{formatDate(data.createdAt)}</h6>
        <p>{data.content}</p>
        <div className="text-center" style={{ display: "flex" }}>
          <button className="blue-button" onClick={() => publishBlog(data.id)}>
            Publish Blog
          </button>
          <Link href={`/user/drafts/${data.id}`}>
            <a className="blue-button">Edit Blog</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

BlogCardTwo.propTypes = {
  data: PropTypes.object,
};

export default BlogCardTwo;
