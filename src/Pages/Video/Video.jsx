import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Video.scss";
import { getURL } from "../../features/apiCall";
import axios from "axios";
import axiosInstance from "../../utils/axiosUtil";
import { Button } from "react-bootstrap";

const Video = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { url, imageName } = useSelector((state) => state.url);
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

    try {
      const data = await axios.put(url, file, {
        "Content-Type": "multipart/form-data",
      });
      console.log(data,imageName);
      if(data.status==200){
        const {data2} = await axiosInstance.post("/api/admin/get-signed-url",{},{
          headers:{
            authorization:`Bearer ${token}`
          }
        })
        console.log(data2)
      }
      
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
