import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Video.scss";
import { getURL } from "../../features/apiCall";

const Video = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { url } = useSelector((state) => state.url);
  console.log(url);

  const submitHandler = async (e) => {
    if (token) getURL(dispatch, token);
  };

  const videoHandler = async () => {};
  return (
    <div>
      <form onSubmit={videoHandler}>
        <input type="file" accept="video/*" onClick={submitHandler} />
      </form>
    </div>
  );
};

export default Video;
