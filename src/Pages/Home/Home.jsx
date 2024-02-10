import React, { useEffect } from "react";
import "./Home.scss";
import CountUp from "react-countup";
import { dashBoardArray } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/generalSlice";


const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setCurrentPage({ currentPage: "Dashboard" }));
  },[])

  return (
    <div className="d-flex w-100 align-items-center text-center justify-content-center">
      <div className="d-flex  flex-wrap gap-3">
        {dashBoardArray.map((data, index) => {
          return (
            <div
              onClick={()=>{
                navigate(data.path);
                dispatch(setCurrentPage({ currentPage: data.content }));
              }}
              key={index}
              style={{ backgroundColor: "#1c1c1e" }}
              className="dashboard_cards card d-flex justify-content-center align-items-center gap-1 flex-column"
            >
              <h2 style={{ color: data.color }}>
                <CountUp end={data.value} useGrouping={false} duration={"2"} />
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
