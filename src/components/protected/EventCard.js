import React from 'react';
import './EventCard.css';
import { Button } from 'react-bootstrap';

const EventCard = props => {
  const { date, location, timeslot, studentSignup1, studentSignup2, userEmail, handleCancel, handleSignup, client } = props;
  return (
    <div className='event-card-container'>
      <div className='event-card-inner'>
        <p><b>Date: </b>{date ? date : 'placeholder date'}</p>
        <p><b>Location: </b>{location ? location : 'placeholder location'}</p>
        <p><b>Timeslot: </b>{timeslot ? timeslot : 'placeholder timeslot'}</p>
        <p>
          <b>Student Slot: </b>
          { userEmail === studentSignup1 
            ? <Button bsStyle="danger" bsSize="xsmall" data-event={date} data-timeslot={timeslot} data-student="student1" onClick={handleCancel}>Cancel My Slot - {userEmail}</Button>
            : <Button data-event={date} data-timeslot={timeslot} data-student="student1" bsStyle="primary" bsSize="xsmall" onClick={handleSignup}>Sign Me Up!</Button>
          }
        </p>
        <p>
          <b>Student Slot: </b>
          { userEmail === studentSignup2 
            ? <Button bsStyle="danger" bsSize="xsmall" data-event={date} data-timeslot={timeslot} data-student="student2" onClick={handleCancel}>Cancel My Slot - {userEmail}</Button>
            : <Button data-event={date} data-timeslot={timeslot} data-student="student2" bsStyle="primary" bsSize="xsmall" onClick={handleSignup}>Sign Me Up!</Button>
          }
        </p>
        { 
          client ? 
          <p style={{color: 'green'}}>Client has RSVP'd</p> :
          <p style={{color: 'red'}}>No Client RSVP Yet</p>
        }
      </div>
    </div>
  )
}

export default EventCard;