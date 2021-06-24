import React, { useEffect, useState } from "react";
import BlogFilter from "../../../components/blog/blog-filter";
import BlogCard from "../../../components/blog/blog-card";
// import BlogData from "../../../data/blog.json";
import useMasonry from "../../../hooks/use-masonry";
import { slugify } from "../../../utils";

const BlogContainer = () => {
  const [BlogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  // "https://nodappserver.herokuapp.com/api/upload"

  useEffect(async () => {
    const res = await fetch("https://nodappserver.herokuapp.com/api/post");
    const data = await res.json();
    console.log(data);

    if (data.msg === "success") {
      setLoading(false);
      setBlogData(data.result);
    }
  }, []);

  const { categories } = useMasonry(
    BlogData,
    ".masonryGrid",
    ".masonry-item",
    ".blog-filter-menu",
    ".blog-filter-menu button"
  );
  return loading ? (
    <div className="hv-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="blog-area blog-masonry-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <BlogFilter categories={categories} />
          </div>
        </div>
        <div className="row masonryGrid post-items-style1">
          {/* <div className="col-sm-6 col-md-6 col-lg-3 resizer"></div> */}
          {BlogData &&
            BlogData.map((blog) => (
              <div
                key={blog.id}
                className={`col-sm-6 col-md-6 col-lg-4 masonry-item ${blog.categories
                  .map((cat) => slugify(cat))
                  .join(" ")}`}
                style={{ marginTop: "10px" }}
              >
                <BlogCard data={blog} />
              </div>
            ))}
        </div>
        {/* <div className="row">
          <div className="col-lg-12 text-center">
            <button className="btn-more">...Load More...</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BlogContainer;
