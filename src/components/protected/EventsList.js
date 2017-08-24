import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import firebase from 'firebase'

export default class EventsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: ['loading...'],
      locations: [],
      studentSignups11: [],
      studentSignups12: [],
      studentSignups21: [],
      studentSignups22: [],
      studentSignups31: [],
      studentSignups32: [],
      studentSignups41: [],
      studentSignups42: [],
      clients: [],
      type: []
    }

    // This binding is necessary to make `this` work in the callback
    this.updateTable = this.updateTable.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.sameEmail = this.sameEmail.bind(this);
  }

  componentDidMount () {
    const eventsRef = firebase.database().ref('events')
      .on('value', (snapshot) => this.updateTable(snapshot))
      // .once('value')
      // .then(data => {
      //   const dataPayload = data.val();
      //   // console.log(dataPayload);
      //   let events = [];
      //   let locations = [];
      //   let studentSignups11 = [];
      //   let studentSignups12 = [];
      //   let studentSignups21 = [];
      //   let studentSignups22 = [];
      //   let studentSignups31 = [];
      //   let studentSignups32 = [];
      //   let studentSignups41 = [];
      //   let studentSignups42 = [];
      //   let type = [];

      //   for (let event in dataPayload) {
      //     const eventDate = new Date(event)
      //     const formattedDate = (eventDate.getMonth() + 1).toString() + "/" + eventDate.getDate() + "/" + eventDate.getFullYear();
      //     events.push(formattedDate);
      //     locations.push(dataPayload[event].location);
      //     studentSignups11.push(dataPayload[event].timeslots['1:00-2:00PM'].student1);
      //     studentSignups12.push(dataPayload[event].timeslots['1:00-2:00PM'].student2);
      //     studentSignups21.push(dataPayload[event].timeslots['2:00-3:00PM'].student1);
      //     studentSignups22.push(dataPayload[event].timeslots['2:00-3:00PM'].student2);
      //     studentSignups31.push(dataPayload[event].timeslots['3:00-4:00PM'].student1);
      //     studentSignups32.push(dataPayload[event].timeslots['3:00-4:00PM'].student2);
      //     studentSignups41.push(dataPayload[event].timeslots['4:00-5:00PM'].student1);
      //     studentSignups42.push(dataPayload[event].timeslots['4:00-5:00PM'].student2);
      //     type.push(dataPayload[event].type);
      //   }
      //   // console.log('events', events)
      //   this.setState({
      //     events: events,
      //     type: type,
      //     locations: locations,
      //     studentSignups11: studentSignups11,
      //     studentSignups12: studentSignups12,
      //     studentSignups21: studentSignups21,
      //     studentSignups22: studentSignups22,
      //     studentSignups31: studentSignups31,
      //     studentSignups32: studentSignups32,
      //     studentSignups41: studentSignups41,
      //     studentSignups42: studentSignups42
      //   })
      // })
  }

  updateTable (data) {
    const dataPayload = data.val();
    // console.log(dataPayload);
    let events = [];
    let locations = [];
    let studentSignups11 = [];
    let studentSignups12 = [];
    let studentSignups21 = [];
    let studentSignups22 = [];
    let studentSignups31 = [];
    let studentSignups32 = [];
    let studentSignups41 = [];
    let studentSignups42 = [];
    let type = [];

    const today = new Date()

    for (let event in dataPayload) {
      const eventDate = new Date(event);
      if (eventDate < today) {
        continue;
      }
      const formattedDate = (eventDate.getMonth() + 1).toString() + "/" + eventDate.getDate() + "/" + eventDate.getFullYear();
      events.push(formattedDate);
      locations.push(dataPayload[event].location);
      studentSignups11.push(dataPayload[event].timeslots['1:00-2:00PM'].student1);
      studentSignups12.push(dataPayload[event].timeslots['1:00-2:00PM'].student2);
      studentSignups21.push(dataPayload[event].timeslots['2:00-3:00PM'].student1);
      studentSignups22.push(dataPayload[event].timeslots['2:00-3:00PM'].student2);
      studentSignups31.push(dataPayload[event].timeslots['3:00-4:00PM'].student1);
      studentSignups32.push(dataPayload[event].timeslots['3:00-4:00PM'].student2);
      studentSignups41.push(dataPayload[event].timeslots['4:00-5:00PM'].student1);
      studentSignups42.push(dataPayload[event].timeslots['4:00-5:00PM'].student2);
      type.push(dataPayload[event].type);
    }
    // console.log('events', events)
    this.setState({
      events: events,
      type: type,
      locations: locations,
      studentSignups11: studentSignups11,
      studentSignups12: studentSignups12,
      studentSignups21: studentSignups21,
      studentSignups22: studentSignups22,
      studentSignups31: studentSignups31,
      studentSignups32: studentSignups32,
      studentSignups41: studentSignups41,
      studentSignups42: studentSignups42
    })
  }

  handleSignup (e) {
    if(e) {
      // console.log(e.target);
      // console.log('data-event', e.target.getAttribute('data-event'))
      const event = e.target.getAttribute('data-event')
      const eventDate = new Date(event)
      const eventMonth = (eventDate.getMonth() + 1).toString();
      if (eventMonth.length < 2){
        eventMonth = '0' + eventMonth;
      }
      // console.log('eventMonth', eventMonth)
      const paddedDate = eventDate.getDate().toString();
      if (paddedDate.length < 2){
        paddedDate = '0' + paddedDate;
      }
      const eventPath = eventDate.getFullYear() + "-" + eventMonth + "-" + paddedDate + "T13:00:00"
      // console.log('data-timeslot', e.target.getAttribute('data-timeslot'))
      const timeslotPath = e.target.getAttribute('data-timeslot')
      // console.log('data-student', e.target.getAttribute('data-student'))
      const studentPath = e.target.getAttribute('data-student')

      let user = firebase.auth().currentUser;
      let userEmail;
      if (user != null) {
        user.providerData.forEach(function (profile) {
          userEmail = profile.email;
        });
      }

      let studentRef = firebase.database().ref("events/" + eventPath + "/timeslots/" + timeslotPath + "/" + studentPath)
      studentRef.set(userEmail)
    }
    
  }

  handleCancel (e) {
    if(e) {
      // console.log(e.target);
      // console.log('data-event', e.target.getAttribute('data-event'))
      const event = e.target.getAttribute('data-event')
      const eventDate = new Date(event)
      const eventMonth = (eventDate.getMonth() + 1).toString();
      if (eventMonth.length < 2){
        eventMonth = '0' + eventMonth;
      }
      // console.log('eventMonth', eventMonth)
      const paddedDate = eventDate.getDate().toString();
      if (paddedDate.length < 2){
        paddedDate = '0' + paddedDate;
      }
      const eventPath = eventDate.getFullYear() + "-" + eventMonth + "-" + paddedDate + "T13:00:00"
      // console.log('data-timeslot', e.target.getAttribute('data-timeslot'))
      const timeslotPath = e.target.getAttribute('data-timeslot')
      // console.log('data-student', e.target.getAttribute('data-student'))
      const studentPath = e.target.getAttribute('data-student')

      let studentRef = firebase.database().ref("events/" + eventPath + "/timeslots/" + timeslotPath + "/" + studentPath)

      studentRef.set(false)
    }
  }

  sameEmail (userEmail, check, data) {
    if (userEmail === check) {
      return (
        <Button bsStyle="danger" bsSize="xsmall" data-event={data.event} data-timeslot={data.timeslot} data-student={data.student} onClick={this.handleCancel}>Cancel My Slot - {check}</Button>
      )
    } else {
      return check
    }
  }

  render () {
    let user = firebase.auth().currentUser;
    let userEmail;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        userEmail = profile.email;
      });
    }

    const listEvents = this.state.events.map((event, index)=>
      <tr key={event}>
        <td>{event}</td>
        <td>{this.state.type[index]}</td>
        <td>{this.state.locations[index]}</td>
        <td>Students:
          <ul>
            <li>{this.state.studentSignups11[index] ? this.sameEmail(userEmail, this.state.studentSignups11[index], {event: event, timeslot: "1:00-2:00PM", student: "student1"}) : 
              <Button data-event={event} data-timeslot={"1:00-2:00PM"} data-student={"student1"} bsStyle="primary" bsSize="xsmall" onClick={this.handleSignup}>Sign Me Up!</Button>}</li>
            <li>{this.state.studentSignups12[index] ? this.sameEmail(userEmail, this.state.studentSignups12[index], {event: event, timeslot: "1:00-2:00PM", student: "student2"}) :<Button bsStyle="primary" bsSize="xsmall" data-event={event} data-timeslot={"1:00-2:00PM"} data-student={"student2"} onClick={this.handleSignup}>Sign Me Up!</Button>}</li>
          </ul>
        </td>
        <td>Students:
          <ul>
            <li>{this.state.studentSignups21[index] ? this.sameEmail(userEmail, this.state.studentSignups21[index], {event: event, timeslot: "2:00-3:00PM", student: "student1"}) : 
            <Button data-event={event} data-timeslot={"2:00-3:00PM"} data-student={"student1"} bsStyle="primary" bsSize="xsmall" onClick={this.handleSignup}>Sign Me Up!</Button>}</li>
          <li>{this.state.studentSignups22[index] ? this.sameEmail(userEmail, this.state.studentSignups22[index], {event: event, timeslot: "2:00-3:00PM", student: "student2"}) :<Button bsStyle="primary" bsSize="xsmall" data-event={event} data-timeslot={"2:00-3:00PM"} data-student={"student2"} onClick={this.handleSignup}>Sign Me Up!</Button>}</li>
          </ul>
        </td>
        <td>Students:
          <ul>
            <li>{this.state.studentSignups31[index] ? this.sameEmail(userEmail, this.state.studentSignups31[index], {event: event, timeslot: "3:00-4:00PM", student: "student1"}) : 
            <Button data-event={event} data-timeslot={"3:00-4:00PM"} data-student={"student1"} bsStyle="primary" bsSize="xsmall" onClick={this.handleSignup}>Sign Me Up!</Button>}</li>
          <li>{this.state.studentSignups32[index] ? this.sameEmail(userEmail, this.state.studentSignups32[index], {event: event, timeslot: "3:00-4:00PM", student: "student2"}) :<Button bsStyle="primary" bsSize="xsmall" data-event={event} data-timeslot={"3:00-4:00PM"} data-student={"student2"} onClick={this.handleSignup}>Sign Me Up!</Button>}</li>
          </ul>
        </td>
        <td>Students:
          <ul>
            <li>{this.state.studentSignups41[index] ? this.sameEmail(userEmail, this.state.studentSignups41[index], {event: event, timeslot: "4:00-5:00PM", student: "student1"}) : 
            <Button data-event={event} data-timeslot={"4:00-5:00PM"} data-student={"student1"} bsStyle="primary" bsSize="xsmall" onClick={this.handleSignup}>Sign Me Up!</Button>}</li>
          <li>{this.state.studentSignups42[index] ? this.sameEmail(userEmail, this.state.studentSignups42[index], {event: event, timeslot: "4:00-5:00PM", student: "student2"}) :<Button bsStyle="primary" bsSize="xsmall" data-event={event} data-timeslot={"4:00-5:00PM"} data-student={"student2"} onClick={this.handleSignup}>Sign Me Up!</Button>}</li>
          </ul>
        </td>
      </tr>
    )

    return (
      <div>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Entrepreneurs</th>
              <th>Location</th>
              <th>1:00-2:00PM</th>
              <th>2:00-3:00PM</th>
              <th>3:00-4:00PM</th>
              <th>4:00-5:00PM</th>
            </tr>
          </thead>
          <tbody>
            {listEvents}
          </tbody>
        </Table>
      </div>
    )
  }
}