import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

function BarChart2(props) {
  console.log('barchart2', props.data);

  var labels = props.data.map((o) => o.name);
  var votes = props.data.map((o) => o.count);

  // let labels = ["😁", "😕", "😳", "🙂"];
  // let votes = [5, 4, 11, 5];
  console.log('barchart2', labels);
  console.log('barchart2', votes);

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    Chart.scaleService.updateScaleDefaults('linear', {
      ticks: {
        min: 0
      }
    });

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "# votes",
            data: votes,
            backgroundColor: ['#007bff', '#007bff', '#007bff', '#007bff', '#007bff'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 50
            }
          }]
        },
        animation: {
          duration: 0
        }
      }
    });
  }, [props]);
  return (
    <canvas id="myChart" width="400" height="400" />
  );
}

export default BarChart2;