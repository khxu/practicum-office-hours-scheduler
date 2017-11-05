import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import { logout } from '../helpers/auth'
import { firebaseAuth, ref } from '../config/constants'
import Scheduler from './protected/Scheduler'

import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/scheduler' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    admin: false
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {

      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })

        const adminRef = ref.child('admins')
        adminRef.on('value', (snapshot) => {
          const admins = snapshot.val()

          const adminEmails = [];
          for (let admin in admins) {
            adminEmails.push(admins[admin].email)
          }

          if ( adminEmails.indexOf(user.email) >= 0 ){
            this.setState({admin: true})
          } else {
            this.setState({admin: false})
          }
        })
        
      } else {
        this.setState({
          authed: false,
          loading: false,
          admin: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
          <div>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">Legal Office Hours Scheduler</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  {this.state.authed && this.state.admin
                  ? <LinkContainer to="/dashboard">
                      <NavItem eventKey={4} href="/dashboard">Dashboard</NavItem>
                    </LinkContainer>
                  : null
                  }
                  <LinkContainer to="/scheduler">
                    <NavItem eventKey={1} href="/scheduler">Scheduler</NavItem>
                  </LinkContainer>
                  {!this.state.authed
                  ? <LinkContainer to="/register">
                      <NavItem eventKey={2}>Register</NavItem>
                    </LinkContainer>
                  : null
                  }
                  {this.state.authed
                  ? <LinkContainer to="/" onClick={() => {
                        logout()
                      }}><NavItem eventKey={3}>Logout</NavItem></LinkContainer>
                  : <LinkContainer to="/login"><NavItem eventKey={3}>Login</NavItem></LinkContainer>
                  }
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <PrivateRoute authed={this.state.authed} path='/scheduler' component={Scheduler} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>  
      </BrowserRouter>
    );
  }
}
