import React, { Component } from "react";
import * as d3 from "d3";
import BubbleChart from "./containers/BubbleChart";

const arr = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
  91,
  92,
  93,
  94,
  95,
  96,
  97,
  98,
  99
];

class App extends Component {
  state = { arr };

  componentDidMount() {
    d3.select("svg")
      .selectAll("line")
      .data(this.state.arr)
      .enter()
      .append("line")
      .attr("x1", d => 0)
      .attr("x2", d => d * 10)
      .attr("y1", d => d * 10)
      .attr("y2", d => 1000)
      .attr("stroke", "black")
      .attr("stroke-width", "1px");
  }

  render() {
    return (
      <div>
        <svg width={300} height={300} viewBox="0 0 1000 1000" />
        <hr />
        <div>
          <BubbleChart />
        </div>
      </div>
    );
  }
}

export default App;
