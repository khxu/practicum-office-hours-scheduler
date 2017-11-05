import React, { Component } from 'react'
import TotalCountBarChart from './TotalCountBarChart'
import './Dashboard.css'
import StudentSignupsByLocationBarChart from './StudentSignupsByLocationBarChart'
import StudentSignupsByTypeBarChart from './StudentSignupsByTypeBarChart'
import StudentSignupsByWeekdayBarChart from './StudentSignupsByWeekdayBarChart'
import ClientSignupsByLocationBarChart from './ClientSignupsByLocationBarChart'
import ClientSignupsByTypeBarChart from './ClientSignupsByTypeBarChart'
import ClientSignupsByWeekdayBarChart from './ClientSignupsByWeekdayBarChart'
import SignupsOverTime from './SignupsOverTime'
import firebase from 'firebase'

export default class Dashboard extends Component {

  constructor() {
    super()
    this.state = {
      firebaseData: {}
    }
  }

  componentDidMount() {
    firebase.database().ref('events')
      .once('value', (snapshot) => { 
        this.setState({ firebaseData: snapshot.val() }) 
      })
  }
  
  render () {
    return (
      <div>
        <h1>Signups Over Time</h1>
        <SignupsOverTime firebaseData={this.state.firebaseData}/>
        <h1>Total Count of Student Signups</h1>
        <TotalCountBarChart firebaseData={this.state.firebaseData}/>
        <h1>Student Signups by Location</h1>
        <StudentSignupsByLocationBarChart firebaseData={this.state.firebaseData}/>
        <h1>Student Signups by Type</h1>
        <StudentSignupsByTypeBarChart firebaseData={this.state.firebaseData}/>
        <h1>Student Signups by Weekday</h1>
        <StudentSignupsByWeekdayBarChart firebaseData={this.state.firebaseData}/>
        <h1>Client Signups by Location</h1>
        <ClientSignupsByLocationBarChart firebaseData={this.state.firebaseData}/>
        <h1>Client Signups by Type</h1>
        <ClientSignupsByTypeBarChart firebaseData={this.state.firebaseData}/>
        <h1>Client Signups by Weekday</h1>
        <ClientSignupsByWeekdayBarChart firebaseData={this.state.firebaseData}/>
      </div>
    )
  }
  
}