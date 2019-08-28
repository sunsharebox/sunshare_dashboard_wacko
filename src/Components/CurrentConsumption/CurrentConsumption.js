import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../ChangingProgressProvider/ChangingProgressProvider";
import "../../App.css";
import './CurrentConsumption.css';


const CurrentConsuption = ({ percentage,chiffre }) => {

  return (
    <div className="row ui-card current-consumption">
      <div className="offset-lg-1 col-lg-3 col-sm-6 justify-content-center align-items-center">
        <ChangingProgressProvider values={[0, percentage]}>
          {value => (
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: "butt",
                trailColor: "#eee"
              })}
            />
          )}
        </ChangingProgressProvider>
        <p className="body-1 text-center">Auto consommation</p>
      </div>
      <div className="offset-lg-3 col-lg-5 col-sm-6 align-self-center" >
        <p className="text-center"><i className="icon-pig-thunder pig" /></p>
        <p className="body-1 text-center" style={{color: "#4caf50"}}>+{chiffre} K/Wh</p>
      </div>
    </div>
  );
};

export default CurrentConsuption;
