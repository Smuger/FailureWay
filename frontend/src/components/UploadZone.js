import React, { useState } from "react";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import {
  getDroppedOrSelectedFiles,
  FormControl,
  Button,
} from "html5-file-selector";
import InputGroup from "react-bootstrap/InputGroup";
import Previews from "../components/Previews";

const UploadZone = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "/api/upload" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {

  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => {

  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={1}
      multiple={false}
      accept="image/*"
    />
  );
};

export default UploadZone;
