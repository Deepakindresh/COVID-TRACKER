import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";


const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: 'white'
        },
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'white',
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let maxCases=0, dateCases, maxDeaths=0, dateDeaths;
  let lastDataPoint;
  for (let date in data.cases) {
    if(maxCases<(data[casesType][date] - lastDataPoint))
    {
      maxCases = data[casesType][date] - lastDataPoint
      dateCases = date;
    }
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  
  return chartData;
};

const maxCases = (data,casesType) => {
  let maxCases=0, dateCases, maxDeaths=0, dateDeaths;
  let lastDataPoint;
  for (let date in data.cases) {
    if(maxCases<(data[casesType][date] - lastDataPoint))
    {
      maxCases = data[casesType][date] - lastDataPoint
      dateCases = date;
    }
    lastDataPoint = data[casesType][date];
  }
  
  return {maxCases,dateCases};
}

function LineGraph({ casesType }) {
  const [data, setData] = useState({});
  const [mcases,setMcases] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          let mc = maxCases(data,casesType);
          setMcases(mc);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  let bg = casesType === "cases" ? "orange":(casesType === "recovered" ? "rgb(6, 175, 6)":"#CC1034");

  return (
    <div>
      <div>
        {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(3, 7, 51, 0.9)",
                borderColor: bg,
                pointBackgroundColor: bg,
                data: data,
                fontColor: "white"
              },
            ],
          }}
          options={options}
        />
      )}
      </div>
      <div>
        <br></br>
        <h1 style={{color: bg}}>Maximum {casesType}</h1>
          <h2 style={{color: "white"}}>{mcases.dateCases}</h2>
          <h3 style={{color: bg}}>{mcases.maxCases}</h3>
      </div>
      
    </div>
  );
}

export default LineGraph;
