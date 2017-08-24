import React, { Component } from 'react'
import EventsList from './EventsList.js'

export default class Scheduler extends Component {
  render () {
    return (
      <div>
        <h1>Schedule</h1>
        <EventsList/>
      </div>
    )
  }
}