import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";

const ImageUpload = (props) => {
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (picture) => {
    console.log(picture[0]);
    const file = picture[0];
    console.log(picture);
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <ImageUploader
      {...props}
      withIcon={true}
      onChange={uploadFileHandler}
      imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
      maxFileSize={5242880}
      singleImage={true}
      withPreview={true}
    />
  );
};

export default ImageUpload;
