import React, { useState, useEffect } from "react";
import prisma from "../../../lib/prisma";
import Link from "next/link";
import slugify from "slugify";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import ScrollToTop from "../../../components/scroll-to-top";
import htmr from "htmr";
import dynamic from "next/dynamic";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

// const SunEditor = dynamic(() => import("suneditor-react"), {
//   ssr: false,
// });

const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

import { useSession, getSession } from "next-auth/client";

function SinglePostForEdit({ post }) {
  const blogData = JSON.parse(post);
  console.log(blogData);

  const [data, setData] = useState({
    title: blogData.title,
    content: blogData.content,
  });
  const [selectedImage, setSelectedImage] = useState();
  const [html, setHtml] = useState("");
  const [message, setMessage] = useState("");
  const [session, loading] = useSession();

  const [tags, setTags] = useState(blogData.tags);
  const [categories, setCategories] = useState(blogData.categories);

  const tagsOptions = [
    "Spirituality",
    "News",
    "Sports",
    "Science",
    "Yoga",
    "People",
    "Nature",
    "City",
    "Jobs",
    "Travel",
    "Fashion",
    "Mobile",
  ];
  const categoriesOptions = [
    "New Added",
    "Travel",
    "Jobs",
    "Sports",
    "Technology",
    "Mobile",
    "Yoga",
    "Spirituality",
    "Nature",
    "Science",
    "People",
    "Others",
  ];
  // const tagSelectedValues = ["Nature", "People"];
  // const catSelectedValues = ["Nature", "People"];

  const onTagSelect = (event) => {
    setTags(event);
  };
  const onCatSelect = (event) => {
    setCategories(event);
  };

  const onTagRemove = (event) => {
    setTags(event);
  };
  const onCatRemove = (event) => {
    setCategories(event);
  };

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const draftPost = async (e) => {
    e.preventDefault();
    if (tags.length === 0) {
      setTags(["News", "Sports", "Science", "Yoga", "People", "Nature"]);
    }
    if (categoriesOptions.length === 0) {
      setCategories(["New Added"]);
    }
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", data.title);
      formData.append("categories", JSON.stringify(categories));
      formData.append("tags", JSON.stringify(tags));
      formData.append("content", html);
      formData.append(
        "slug",
        slugify(data.title, {
          remove: /[*+~.()'"!:@,]/g,
        })
      );
      formData.append("published", false);
      formData.append("author", session?.user?.email);

      const result = await fetch(
        `https://nodappserver.herokuapp.com/api/post/${blogData.id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();
      console.log(resultJson);
      if (resultJson.msg === "success") {
        setMessage("Your Draft is updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const publishPost = async (e) => {
    e.preventDefault();
    if (tags.length === 0) {
      setTags(["News", "Sports", "Science", "Yoga", "People", "Nature"]);
    }
    if (categoriesOptions.length === 0) {
      setCategories(["New Added"]);
    }
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", data.title);
      formData.append("categories", JSON.stringify(categories));
      formData.append("tags", JSON.stringify(tags));
      formData.append("content", html);
      formData.append(
        "slug",
        slugify(data.title, {
          remove: /[*+~.()'"!:@,]/g,
        })
      );
      formData.append("published", true);
      formData.append("author", session?.user?.email);

      const result = await fetch(
        `https://nodappserver.herokuapp.com/api/post/${blogData.id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();
      console.log(resultJson);
      if (resultJson.msg === "success") {
        setMessage("Your Blog is updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) {
    return (
      <Layout>
        <SEO
          title="Edit Blog | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/drafts"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <div className="text-center-black">
              <p>Please Sign In to upload photos </p>
              <Link href="/auth/signin">
                <a>Sign In</a>
              </Link>
            </div>
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <SEO
        title="New Blog | Victoria Studio "
        canonical={process.env.PUBLIC_URL + "/user/newpost"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            {message === "" ? (
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="text-center-black">
                    <p>SELECT BLOG THUMBNAIL IMAGE</p>
                  </div>
                  <div className="img-style">
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : blogData.image
                      }
                      alt={selectedImage ? selectedImage.name : null}
                      height={280}
                    />

                    <form>
                      <input
                        accept=".jpg, .png, .jpeg"
                        onChange={handleChange}
                        type="file"
                        required
                      />
                    </form>
                  </div>
                  <div className="text-center-black">
                    <p>SELECT BLOG CATEGORY</p>
                  </div>
                  <Multiselect
                    options={categoriesOptions} // Options to display in the dropdown
                    selectedValues={blogData.categories} // Preselected value to persist in dropdown
                    onSelect={onCatSelect} // Function will trigger on select event
                    onRemove={onCatRemove} // Function will trigger on remove event
                    placeholder="+ Add Categories"
                    id="catOption"
                    isObject={false}
                    className="catDropdown"
                  />
                  <div className="text-center-black">
                    <p>SELECT BLOG TAGS</p>
                  </div>
                  <Multiselect
                    options={tagsOptions} // Options to display in the dropdown
                    selectedValues={blogData.tags} // Preselected value to persist in dropdown
                    onSelect={onTagSelect} // Function will trigger on select event
                    onRemove={onTagRemove} // Function will trigger on remove event
                    placeholder="+ Add Tags"
                    id="tagOption"
                    isObject={false}
                    className="tagDropdown"
                  />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-8">
                  <div className="img-style">
                    <input
                      type="text"
                      name="title"
                      value={data.title}
                      onChange={(e) =>
                        setData({ ...data, title: e.target.value })
                      }
                      placeholder="Blog Title ..."
                      required
                    />
                  </div>
                  <SunEditor
                    height="60vh"
                    setDefaultStyle="font-family: Arial; font-size: 16px;"
                    placeholder="Write your content here ...."
                    onChange={handleEditorChange}
                    defaultValue={data.content}
                    setOptions={{
                      buttonList: buttonList.complex,
                    }}
                    required
                  />
                  <div style={{ justifyContent: "flex-end" }}>
                    <button className="blue-button" onClick={draftPost}>
                      Draft
                    </button>
                    <button className="blue-button" onClick={publishPost}>
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center-black">
                <p>{message}</p>

                <button className="blue-button" onClick={() => setMessage("")}>
                  New Blog
                </button>
                <Link href="/blogs">
                  <a className="blue-button">Goto Blogs Page</a>
                </Link>
              </div>
            )}
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ params, req, res }) {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { post: {} } };
  }
  try {
    const { id } = params;
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    console.log(post);
    return {
      props: { post: JSON.stringify(post) },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

export default SinglePostForEdit;
