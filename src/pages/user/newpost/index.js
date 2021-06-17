import React, { useState } from "react";
import Link from "next/link";
import slugify from "slugify";
import SEO from "../../../components/seo";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import Layout from "../../../layouts";
import ScrollToTop from "../../../components/scroll-to-top";
import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Multiselect = dynamic(
  () =>
    import("multiselect-react-dropdown").then((module) => module.Multiselect),
  {
    ssr: false,
  }
);

const Newpost = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [html, setHtml] = useState("");
  const [session, loading] = useSession();
  const [title, setTitle] = useState();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const tagsOptions = [
    "Spirituality",
    "News",
    "Sports",
    "Science",
    "Yoga",
    "People",
    "Nature",
  ];
  const categoriesOptions = [
    "Yoga",
    "Spirituality",
    "Nature",
    "Science",
    "People",
    "Others",
  ];
  const tagSelectedValues = ["Nature", "People"];
  const catSelectedValues = ["Nature", "People"];

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
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", title);
      formData.append("categories", JSON.stringify(categories));
      formData.append("tags", JSON.stringify(tags));
      formData.append("content", html);
      formData.append(
        "slug",
        slugify(title, {
          remove: /[*+~.()'"!:@,]/g,
        })
      );
      formData.append("published", false);
      formData.append("author", session?.user?.email);

      const result = await fetch(
        "https://nodappserver.herokuapp.com/api/publish",
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();
      console.log(resultJson);
    } catch (error) {
      console.error(error);
    }
  };

  const publishPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("title", data.title);
      formData.append("categories", JSON.stringify(categories));
      formData.append("tags", JSON.stringify(tags));
      formData.append("content", data.content);
      formData.append(
        "slug",
        slugify(data.title, {
          remove: /[*+~.()'"!:@,]/g,
        })
      );
      formData.append("published", true);
      formData.append("author", session?.user?.email);

      const result = await fetch(
        "https://nodappserver.herokuapp.com/api/publish",
        {
          method: "POST",
          body: formData,
        }
      );
      const resultJson = await result.json();
      console.log(resultJson);
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) {
    return (
      <Layout>
        <SEO title="Victoria Studio - Blog" />
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
      <SEO title="Victoria Studio - Blog" />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-4">
                <div className="text-center-black">
                  <p>SELECT BLOG THUMBNAIL IMAGE</p>
                </div>
                <div className="img-style">
                  <img
                    src={
                      selectedImage ? URL.createObjectURL(selectedImage) : null
                    }
                    alt={selectedImage ? selectedImage.name : null}
                    height={280}
                  />

                  <form>
                    <input
                      accept=".jpg, .png, .jpeg"
                      onChange={handleChange}
                      type="file"
                    />
                  </form>
                </div>
                <div className="text-center-black">
                  <p>SELECT BLOG CATEGORY</p>
                </div>
                <Multiselect
                  options={categoriesOptions} // Options to display in the dropdown
                  selectedValues={catSelectedValues} // Preselected value to persist in dropdown
                  onSelect={onCatSelect} // Function will trigger on select event
                  onRemove={onCatRemove} // Function will trigger on remove event
                  placeholder="+ Add Categories"
                  isObject={false}
                />
                <div className="text-center-black">
                  <p>SELECT BLOG TAGS</p>
                </div>
                <Multiselect
                  options={tagsOptions} // Options to display in the dropdown
                  selectedValues={tagSelectedValues} // Preselected value to persist in dropdown
                  onSelect={onTagSelect} // Function will trigger on select event
                  onRemove={onTagRemove} // Function will trigger on remove event
                  placeholder="+ Add Tags"
                  isObject={false}
                />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-8">
                <div className="img-style">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Blog Title ..."
                  />
                </div>
                <SunEditor
                  height="60vh"
                  setDefaultStyle="font-family: cursive; font-size: 18px;"
                  placeholder="Write your content here ...."
                  onChange={handleEditorChange}
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
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </Layout>
  );
};

export default Newpost;