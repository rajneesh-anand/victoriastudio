import React, { useState } from "react";
import Select from "react-dropdown-select";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState();

  const options = ["FEATURED", "NEW ADDED", "SPORTS"];
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
    <>
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
        <input accept=".jpg, .png, .jpeg" onChange={handleChange} type="file" />
      </form>
    </>
  );
};

export default Upload;
