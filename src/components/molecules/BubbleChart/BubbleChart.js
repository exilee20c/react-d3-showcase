import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import c from "./BubbleChart.module.scss";

export default class BubbleChart extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    dataSource: PropTypes.array.isRequired,
    circleConfig: PropTypes.object.isRequired,
    textConfig: PropTypes.object.isRequired
  };

  static defaultProps = {
    width: 500,
    height: 500
  };

  static getDerivedStateFromProps(props, state) {
    return {
      nodes: props.dataSource.map(item => ({
        ...item,
        width: props.width,
        height: props.height
      }))
    };
  }

  state = { nodes: null };

  chartRef = React.createRef();

  init = () => {
    if (this.state.nodes === null) {
      return;
    }

    this.svg = d3
      .select(this.chartRef.current)
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);

    this.svg.call(
      d3
        .drag()
        .container(this.chartRef.current)
        .subject(this.getDragSubject)
        .on("start", this.handleDragStart)
        .on("drag", this.handleDragMove)
        .on("end", this.handleDragEnd)
    );

    this.simulation = d3
      .forceSimulation()
      .velocityDecay(0.4)
      .force("x", d3.forceX().strength(0.04))
      .force(
        "y",
        d3
          .forceY()
          .strength(
            0.04 *
              (this.props.width / this.props.height) *
              (this.props.width / this.props.height)
          )
      )
      .force(
        "collide",
        d3
          .forceCollide()
          .radius(d => d.r + 0.5)
          .iterations(2)
      );

    this.simulation.nodes(this.state.nodes).on("tick", this.tick);
  };

  tick = () => {
    const dataCircle = d3
      .select(this.chartRef.current)
      .select("svg")
      .selectAll("circle")
      .data(this.state.nodes);

    const dataText = d3
      .select(this.chartRef.current)
      .select("svg")
      .selectAll("text")
      .data(this.state.nodes);

    this.initCircle(dataCircle);
    this.initCircle(dataCircle.enter().append("circle"));
    this.initText(dataText);
    this.initText(dataText.enter().append("text"));
  };

  initCircle = selection => {
    const { circleConfig } = this.props;
    return Object.keys(circleConfig).reduce((b, a) => {
      const config = circleConfig[a];
      const { type, value } = config;

      if (typeof b[type] === "function") {
        return b[type](a, value);
      }

      return b;
    }, selection);
  };

  initText = selection => {
    const { textConfig } = this.props;
    return Object.keys(textConfig).reduce((b, a) => {
      const config = textConfig[a];
      const { type, value } = config;

      if (typeof b[type] === "function") {
        return b[type](a, value);
      }

      return b;
    }, selection.text(d => d.name));
  };

  getDragSubject = () =>
    this.simulation.find(
      d3.event.x - this.props.width / 2,
      d3.event.y - this.props.height / 2
    );

  handleDragStart = () => {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  };

  handleDragMove = () => {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  };

  handleDragEnd = () => {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  };

  componentDidMount() {
    this.init();
  }

  render() {
    return <div className={c["bubble-chart"]} ref={this.chartRef} />;
  }
}
