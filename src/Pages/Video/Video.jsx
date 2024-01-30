import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Video.scss";
import { getURL } from "../../features/apiCall";
import axios from "axios";
import { Button } from "react-bootstrap";

const Video = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { url } = useSelector((state) => state.url);
  const [file, setFile] = useState("");
  console.log(url);
  console.log(file);

  const submitHandler = async (e) => {
    if (token) getURL(dispatch, token);
  };

  const videoHandler = async (e) => {
    e.preventDefault();

    if (!file) {
      console.log("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const data = await axios.put(url, formData, {
        "Content-Type": "multipart/form-data",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
            submitHandler();
          }}
        />
        <Button onClick={videoHandler}>Submit</Button>
      </form>
    </div>
  );
};

export default Video;
