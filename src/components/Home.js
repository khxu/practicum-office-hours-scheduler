import React, { Component } from 'react'
import Logo from '../img/NBPracticumLogo2017.png'
import './Home.css'

export default class Home extends Component {
  render () {
    return (
      <div>
        <div className='logo-container'>
          <img className='logo' src={Logo} alt='practicum-logo'/>
        </div>
        <h2>Welcome to the New Business Practicum's Office Hours Scheduler!</h2>
        <h3>Signing Up and Troubleshooting</h3>
        <p>If you're looking to help out at office hours, please feel free to create an account by clicking "Register" on the navigation bar at the top of this screen. After logging in, click "Scheduler" to sign up for open timeslots, or cancel a session you signed up for previously.</p>
        <p>Please contact Kevin Xu (khxu@law.berkeley.edu) if you need any help registering an account or using the Scheduler.</p>
        <h3>Guidelines</h3>
        <p>First, THANK YOU for taking the time to help provide this important service to East Bay and Central Valley entrepreneurs of limited means. These office hours play a vital role within the framework of services we offer at the Practicum by assisting clients with limited service tasks, such as delivering template documents and providing initial answers to legal questions. Our goal is to give you opportunities to take the lead in both diagnosing and responding to entrepreneur legal needs, always with solid backup from a supervising attorney. Please read on to learn more about client questions that will likely come up, how office hours are structured, the dress code, and expectations for students.</p>
        <h4>Clients’ Needs</h4>
        <p>While clients are not pre-screened, clients in previous sessions have frequently asked about the following topics:
        </p>
        <ul>
          <li>Entity formation (both nonprofit and for-profit);</li>
          <li>Investment instruments (convertible notes, SAFE/KISS agreements);</li>
          <li>Worker relationships (employees, independent contractors, and interns);</li>
          <li>Intellectual property (patent, trademark, copyright, trade secret); and</li>
          <li>Customer/supplier relationships (Terms of Use/Privacy Policy, sales agreements, etc.)</li>
        </ul>
        <h4>Office Hours Structure</h4>
        <p>Office hours are currently held from 1:00 - 5:00 PM M & W, with client sessions starting at the beginning of each hour.</p>
        <p>Client sessions have the following structure (taking the 1:00 - 2:00 PM timeslot as an example):
        </p>
        <ul>
          <li><b>Diagnostic Interview. (15 minutes)</b> 1:00 - 1:15 PM. Law students take the lead to ask fact-gathering questions based on the BECOME diagnostic. (No legal advice/answers are provided yet.)</li>
          <li><b>Student-Supervisor Private Consult. (10 minutes)</b> 1:15 - 1:25 PM. The client is asked to step outside while the students and Supervisor (currently Kevin Xu) discuss issues spotted during the Diagnostic Interview. Students divvy up the issues and prepare to provide their advice and reasoning to the client with guidance from the Supervisor.</li>
          <li><b>Legal Advice. (15 minutes)</b> 1:25 - 1:40 PM. Law students provide legal advice to the client, while the Supervisor chimes in as-needed. Limited service follow-up tasks can be offered to the client, such as sending template documents and educational slide decks.</li>
          <li><b>Feedback. (20 minutes)</b> 1:40 - 2:00 PM. Law students ask the Supervisor clarifying questions with respect to unfamiliar legal issues that arose during the client session. Law students and the Supervisor provide feedback to one another regarding the client session. Law students write up and send a list of follow-up tasks to Kevin Xu (khxu@law.berkeley.edu), who will primarily be responsible for following up (although volunteers for follow-up tasks are always welcome).</li>
        </ul>
        <h4>Dress Code</h4>
        <p>Please come to the client session dressed in business casual attire. This is important for maintaining a professional law office atmosphere. If you forget to bring a set of business casual clothes, and can’t borrow clothing from friends, please let Kevin Xu (khxu@law.berkeley.edu) know ASAP so that you can reschedule for another date.</p>
        <h4>Student Expectations</h4>
        <p>Our goal with these legal office hours is to provide additional experiential learning opportunities to help you develop more comfort and experience practicing law (under supervision). As such, students are expected to take the lead on managing each client session, asking exploratory questions and providing legal advice (with the oversight of the Supervisor). Students will ensure that follow-up tasks are sent to Kevin Xu (khxu@law.berkeley.edu) within 24 hours after the client session.</p>
      </div>
    )
  }
}