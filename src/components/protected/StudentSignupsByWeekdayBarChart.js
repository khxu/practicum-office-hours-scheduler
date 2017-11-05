import React, { Component } from 'react'
import * as d3 from 'd3';

const divStyle = {
  maxWidth: '700px'
}

export default class StudentSignupsByWeekdayBarChart extends Component {
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
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let studentWeekdayCount = {};

    for (let event in events) {
      const eventDate = new Date(event);
      if (studentWeekdayCount[days[eventDate.getDay()]] === undefined) {
        studentWeekdayCount[days[eventDate.getDay()]] = 0;
      }

      for (let timeslot in events[event].timeslots){
        if(events[event].timeslots[timeslot].student1){
          studentWeekdayCount[days[eventDate.getDay()]] += 1;
        }

        if(events[event].timeslots[timeslot].student2){
          studentWeekdayCount[days[eventDate.getDay()]] += 1;
        }
      }
    }
    
    const svg = d3.select('.studentSignupsByWeekdayBarChart')
    const margin = { top: 20, right: 20, bottom: 30, left: 40}
    const g = svg.append('g')
                 .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const chartWidth = 500 - margin.left - margin.right;
    const chartHeight = 300 - margin.top - margin.bottom;
    
    const data = d3.entries(studentWeekdayCount).sort((a, b) => ( b.value - a.value ));

    svg
      .attr("viewBox", "0 0 500 300")

    const xScale = d3.scaleBand()
                     .domain(data.map((user) => ( user.key )))
                     .range([0, chartWidth])
                     .padding(0.1)

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data.map((user) => ( user.value )))])
                     .range([chartHeight, 0])

    g.selectAll('.bar')
      .data(data, (user) => { user.key })
    .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', '#00599d')
      .attr('x', (d, i) => (xScale(d.key)) )
      .attr('y', (d) => ( yScale(d.value) ))
      .attr('height', (d) => ( chartHeight - yScale(d.value)) )
      .attr('width', xScale.bandwidth())

    //add y axis
    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(yScale).ticks(7).tickFormat(d3.format('d')))

    //add x axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0, ' + chartHeight + ')')
      .call(d3.axisBottom(xScale))
    
  }
  render() {
    return (
      <div className="studentSignupsByWeekdayBarChartContainer barChartContainer" style={divStyle}>
        <svg className="studentSignupsByWeekdayBarChart">
        </svg>
      </div>
    );
  }

}