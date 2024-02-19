import React, { useEffect } from "react";
import "./Home.scss";
import CountUp from "react-countup";
import { dashBoardArray } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/generalSlice";
import { getHomeData } from "../../features/apiCall";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const { homeData } = useSelector((state) => state.home);
  // console.log(homeData);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Dashboard" }));
  }, []);
  useEffect(() => {
    if (token) getHomeData(dispatch, token);
  }, []);

  return (
    <div className="d-flex w-100 align-items-center text-center justify-content-center">
      <div className="d-flex  flex-wrap gap-3">
        {dashBoardArray.map((data, index) => {
          return (
            <div
              onClick={() => {
                navigate(data.path);
                dispatch(setCurrentPage({ currentPage: data.content }));
              }}
              key={index}
              style={{ backgroundColor: "#1c1c1e" }}
              className="dashboard_cards card d-flex justify-content-center align-items-center gap-1 flex-column"
            >
              <h2 style={{ color: data.color }}>
                <CountUp end={homeData[data.key]} useGrouping={false} duration={"2"} />
              </h2>
              <h5 style={{ color: "#f9f9f9", fontSize: "16px" }}>{data.key}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
