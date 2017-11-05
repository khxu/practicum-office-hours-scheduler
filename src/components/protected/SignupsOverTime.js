import React, { Component } from 'react'
import * as d3 from 'd3';

const divStyle = {
  maxWidth: '700px'
}

export default class SignupsOverTime extends Component {
  constructor(props) {
    super(props)
    this.addBarChartData.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.firebaseData !== this.props.firebaseData) {
      this.addBarChartData(this.props.firebaseData)
    }
  }

  addBarChartData(events) {
    let data = [];
    for (let event in events) {
      if (events[event].holiday === true) continue
      let studentSignups = 0;
      let clientSignups = 0;
      for (let timeslot in events[event].timeslots) {
        if (events[event].timeslots[timeslot].client === true) {
          clientSignups++;
        }

        if (events[event].timeslots[timeslot].student1) {
          studentSignups++;
        }

        if (events[event].timeslots[timeslot].student2) {
          studentSignups++;
        }
      }
      data.push( {event: event, students: studentSignups, clients: clientSignups} )
    }

    const parseTime = d3.timeFormat('%m-%d-%Y');

    data.forEach( d => {
      d.event = parseTime(new Date (d.event));
      d.students = +d.students;
      d.clients = +d.clients;
    })

    const svg = d3.select('.signupsOverTimeChart')
    const margin = { top: 20, right: 20, bottom: 80, left: 40}
    const g = svg.append('g')
                 .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const chartWidth = 500 - margin.left - margin.right;
    const chartHeight = 500 - margin.top - margin.bottom;

    const keys = ['clients', 'students'];

    const x0 = d3.scaleBand()
      .rangeRound([0, chartWidth])
      .paddingInner(0.1)
      .domain(data.map(d => d.event));
    
    const x1 = d3.scaleBand()
      .padding(0.05)
      .domain(keys)
      .rangeRound([0, x0.bandwidth()]);

    const yScale = d3.scaleLinear()
      .rangeRound([chartHeight, 0])
      .domain([0, d3.max(data, d => d.students)]);

    const colorScale = d3.scaleOrdinal()
      .range(['#00599d', '#f3b927'])

    svg
      .attr("viewBox", "0 0 500 500")

    g.append('g')
      .selectAll('g')
      .data(data)
      .enter().append('g')
        .attr('transform', function(d) { return "translate(" + x0(d.event) + ",0)"; })
      .selectAll('rect')
      .data(d => keys.map( key => ({key: key, value: d[key]}) ))
      .enter().append('rect')
        .attr('x', d => x1(d.key))
        .attr('y', d => yScale(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', d => chartHeight - yScale(d.value))
        .attr('fill', d => colorScale(d.key))

    //add y axis
    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(yScale).ticks(7).tickFormat(d3.format('d')))

    //add x axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0, ' + chartHeight + ')')
      .call(d3.axisBottom(x0))
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    //legend
    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.map(key => key.slice(0, 1).toUpperCase() + key.slice(1)).slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", chartWidth - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", colorScale);

    legend.append("text")
        .attr("x", chartWidth - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

  }

  render() {
    return (
      <div className="signupsOverTimeContainer barChartContainer" style={divStyle}>
        <svg className="signupsOverTimeChart">
        </svg>
      </div>
    );
  }
}