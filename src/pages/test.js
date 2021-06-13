import React, { useState } from "react";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState();
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

  return (
    <form>
      <button type="button" onClick={handleImageUpload}>
        Upload
      </button>
      <input accept=".jpg, .png, .jpeg" onChange={handleChange} type="file" />
    </form>
  );
};

export default Upload;
