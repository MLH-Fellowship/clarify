import React from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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

    const ctx = this.chartRef.current.getContext('2d');
    // ctx.canvas.height = 250;

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

    var color = data.map(x => this.props.color);

    Chart.defaults.global.defaultFontSize = 14;
    // Chart.defaults.global.defaultFontFamily = 'Source Sans Pro';
    myChart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '# votes',
            data: data,
            backgroundColor: color,
            borderWidth: 0,
          }
        ]
      },
      options: {
        animation: {
          duration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false
        },
        layout: {
          padding: {
            top: 25,
            right: 10
          }
        },
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            anchor: 'end',
            align: 'end',
            offset: '6',
            color: this.props.color,
            labels: {
              title: {
                font: {
                  weight: 'bold'
                }
              }
            }
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            barPercentage: 0.8,
            gridLines: {
              display: false // vertical lines
            },
            ticks: {
              display: false // axis labels
            }
          }],
          yAxes: [{
            gridLines: {
              // borderDash: [4],
              display: false, // horizontal lines
              // zeroLineColor: '#fafafa',
              drawBorder: true, // y axis line
              // color: '#fafafa'
            },
            ticks: {
              display: false, // axis labels
              beginAtZero: true,
              suggestedMax: 15
            }
          }]
        }
      }
    });
  }

  render() {
    return (
      <>
        <div class='chart-container'>
          <canvas id='myChart' ref={this.chartRef} />
        </div>
      </>
    )
  };
}

export default BarChart2;