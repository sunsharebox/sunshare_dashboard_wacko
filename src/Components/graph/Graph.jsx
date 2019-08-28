import React, { useState, useEffect } from 'react';
import CanvasJSReact from '../../assets/js/canvasjs.react';
import axios from 'axios';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const object = {
  "2019-06-27 18:00:00": 98,
  "2019-06-27 19:00:00": 46,
  "2019-06-27 20:00:00": 17,
  "2019-06-27 21:00:00": 8,
  "2019-06-27 21:37:00": 1,
  "2019-06-27 22:13:00": 0,
  "2019-06-28 06:05:00": 0,
  "2019-06-28 06:33:00": 1,
  "2019-06-28 07:00:00": 10,
  "2019-06-28 08:00:00": 33,
  "2019-06-28 09:00:00": 78,
  "2019-06-28 10:00:00": 133,
  "2019-06-28 11:00:00": 187,
  "2019-06-28 12:00:00": 229,
  "2019-06-28 13:00:00": 256,
  "2019-06-28 14:00:00": 260,
  "2019-06-28 15:00:00": 244,
  "2019-06-28 16:00:00": 206,
  "2019-06-28 17:00:00": 155,
  "2019-06-28 18:00:00": 98,
  "2019-06-28 19:00:00": 46,
  "2019-06-28 20:00:00": 17,
  "2019-06-28 21:00:00": 8,
  "2019-06-28 21:37:00": 1,
  "2019-06-28 22:13:00": 0,
  "2019-06-29 06:06:00": 0,
  "2019-06-29 06:33:00": 1,
  "2019-06-29 07:00:00": 10,
  "2019-06-29 08:00:00": 30,
  "2019-06-29 09:00:00": 66,
  "2019-06-29 10:00:00": 107,
  "2019-06-29 11:00:00": 147,
  "2019-06-29 12:00:00": 181,
  "2019-06-29 13:00:00": 199,
  "2019-06-29 14:00:00": 205,
  "2019-06-29 15:00:00": 195,
  "2019-06-29 16:00:00": 166,
  "2019-06-29 17:00:00": 128,
  "2019-06-29 18:00:00": 85,
  "2019-06-29 19:00:00": 43,
  "2019-06-29 20:00:00": 17,
  "2019-06-29 21:00:00": 9,
  "2019-06-29 21:37:00": 1,
  "2019-06-29 22:13:00": 0
};

const surface=10;

const Graph = () => {

  const [modc, setModc] = useState();
  const [xVal, setXVal] = useState([]);
  const [yVal, setYVal] = useState([]);

  // useEffect(()=>{
  //   axios.get('http://api.forecast.solar/estimate/47.21725/-1.55336/37/0/0.37')
  //   .then((result)=>{
  //     setModc(result.data.result.watts)
  //   })
  // }, []);

  useEffect(() => {
    setModc(object);
    if (modc) setXVal(Object.keys(modc));
    if (modc) setYVal(Object.values(modc));
  }, [modc]);

  console.log(xVal.map((value, index) => ({ x: new Date(value), y: yVal[index] })));

  const options = {

    animationEnabled: true,
    title: {
      text: "Prévisions de production journalière"
    },
    axisX: {
      valueFormatString: "HH:mm"
    },
    axisY: {
      title: "prod (in W)",
      suffix: " W",
      includeZero: false,
      viewportMinimum: -10
    },
    data: [{
      yValueFormatString: "#,### W",
      xValueFormatString: "DDMMM HH:mm",
      type: "spline",
      dataPoints:
        xVal.map((value, index) => ({ x: new Date(value), y: yVal[index]*surface }))
    }]
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
      /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
}

export default Graph;
