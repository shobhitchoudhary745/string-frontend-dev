import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Video.scss";
import { getURL } from "../../features/apiCall";
import axios from "../../utils/axiosUtil";
import { Button } from "react-bootstrap";

const Video = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { url } = useSelector((state) => state.url);
  const [file,setFile] = useState("")
  console.log(url);
  console.log(file)


  const submitHandler = async (e) => {
    // setFile(e.target.files[0]);

    if (token) getURL(dispatch, token);
  };

  const videoHandler = async (e) => {
    e.preventDefault();
    
    
    const formData = new FormData();
    formData.append("file",file)
    try {
      const {data} = await axios.put(url,file,{
        "Content-Type":"multipart/form-data"
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <form >
        <input type="file" accept="video/*" onChange={(e)=>setFile(e.target.files[0])} onClick={submitHandler} />
      </form>
      <Button onClick={videoHandler}>Submit</Button>
    </div>
  );
};

export default Video;
