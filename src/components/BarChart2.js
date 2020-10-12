import React from 'react';
import Chart from 'chart.js';
import '../styles/format.css';

let myChart;

class BarChart2 extends React.Component {
  // reference to canvas
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {

    const myChartRef = this.chartRef.current.getContext("2d");

    if (myChart) {
      myChart.destroy();
    }

    var labels = this.props.labels;

    // [{ label: count }...]
    let data = this.props.data.map(o => { return { [o.name]: o.count } });

    // sort data from firebase based on label order passed in via props.labels
    data.sort(function (a, b) {
      return labels.indexOf(Object.keys(a)[0]) - labels.indexOf(Object.keys(b)[0]);
    });

    // map into [#, #, #...] to use in chart datasets
    data = data.map(o => Object.values(o)[0]);

    myChart = new Chart(myChartRef, {
      type: "bar",
      response: true,
      maintainAspectRatio: false,
      data: {
        labels: labels,
        datasets: [
          {
            label: "# votes",
            data: data,
            backgroundColor: ['rgba(0, 123, 255, 0.5)', 'rgba(0, 123, 255, 0.5)', 'rgba(0, 123, 255, 0.5)', 'rgba(0, 123, 255, 0.5)', 'rgba(0, 123, 255, 0.5)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 50,
              display: false
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        animation: {
          duration: 0
        }
      }
    });
  }

  render() {
    return <canvas id="myChart" ref={this.chartRef}/>
  };
}

export default BarChart2;