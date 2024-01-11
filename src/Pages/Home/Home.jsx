import React from "react";
import "./Home.scss";
import CountUp from "react-countup";
import { dashBoardArray } from "../../utils/helper";


const Home = () => {
  return (
    <div className="d-flex w-100 align-items-center text-center justify-content-center">
      <div className="d-flex  flex-wrap gap-3">
        {dashBoardArray.map((data, index) => {
          return (
            <div
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
