import React, { useState } from "react";
import SEO from "../components/seo";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import Layout from "../layouts";
import { useSession } from "next-auth/client";
import Link from "next/link";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [session, loading] = useSession();

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    const result = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const resultJson = await result.json();
    console.log(resultJson);
  };

  if (!loading && !session) {
    return (
      <React.Fragment>
        <Layout>
          <SEO title="Victoria Studio | Upload" />
          <div className="wrapper home-default-wrapper">
            <Header />

            <div className="main-content">
              <div className="text-center-black">
                <p>Please Sign In to upload photos </p>
                <Link href="/auth/signin">
                  <a>Sign In</a>
                </Link>
              </div>
            </div>
            <Footer />
          </div>
        </Layout>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Layout>
        <SEO title="Victoria Studio | Upload" />
        <div className="wrapper home-default-wrapper">
          <Header />

          <div className="main-content">
            <div className="text-center">
              <img
                src={selectedImage ? URL.createObjectURL(selectedImage) : null}
                alt={selectedImage ? selectedImage.name : null}
                width={250}
                height={280}
              />
              <form>
                <button type="button" onClick={handleImageUpload}>
                  Upload
                </button>
                <input
                  accept=".jpg, .png, .jpeg"
                  onChange={handleChange}
                  type="file"
                />
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Upload;
