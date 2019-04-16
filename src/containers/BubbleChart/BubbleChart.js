import React, { Component } from "react";
import * as d3 from "d3";
import BubbleChart from "../../components/molecules/BubbleChart/BubbleChart";

export default class BubbleChartContainer extends Component {
  state = {
    nodes: d3.range(75).map(i => ({ r: Math.random() * 4 + 16, name: `_${i}` }))
  };

  render() {
    return (
      <article>
        <BubbleChart
          width={400}
          height={400}
          dataSource={this.state.nodes}
          circleConfig={{
            cx: { type: "attr", value: d => d.width / 2 + d.x },
            cy: { type: "attr", value: d => d.height / 2 + d.y },
            r: { type: "attr", value: d => d.r },
            stroke: { type: "attr", value: "black" },
            "stroke-width": { type: "attr", value: 1 },
            fill: { type: "attr", value: "transparent" }
          }}
          textConfig={{
            x: { type: "attr", value: d => d.width / 2 + d.x },
            y: { type: "attr", value: d => d.height / 2 + d.y },
            dy: { type: "attr", value: ".3em" },
            "text-anchor": { type: "attr", value: "middle" },
            stroke: { type: "attr", value: "black" },
            "stroke-width": { type: "attr", value: 1 }
          }}
        />
      </article>
    );
  }
}
