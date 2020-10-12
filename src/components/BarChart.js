import React from 'react';

function BarGroup(props) {
  let heightScale = d => d * 25

  let height = heightScale(props.d.count)
  let xMid = props.barWidth * 0.45

  return (
    <g className="bar-group">
      <text className="name-label" y="-8" x={xMid + 5} alignmentBaseline="middle" >{props.d.name}</text>
      <rect y={props.barPadding * 0.5} width={props.barWidth - props.barPadding} height={height} fill={barColour} />
      {props.d.count && <text className="value-label" y={height - 8} x={xMid} alignmentBaseline="middle" >{props.d.count}</text>}
    </g>
  );
}

function BarChart(props) {
  let barWidth = 100;
  let barPadding = 20;

  let barGroups = props.data.map((d, i) =>
    <g transform={`translate(${i * (barWidth + barPadding)}, 0)`}>
      <BarGroup d={d} barWidth={barWidth} barPadding={barPadding} />
    </g>
  )

  return (
    <svg width="800" height="800">
      <g className="container">
        <g className="chart" transform="translate(100,60)">
          {barGroups}
        </g>
      </g>
    </svg>
  );
}

export default BarChart;