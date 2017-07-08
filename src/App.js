import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Home, MidnightsUser, MidnightsPoints,
  MidnightsWeek, MidnightsAdminDashboard, MidnightsAdminAccounts,
  MidnightsAdminCreateOne, MidnightsAdminReview,
} from './scenes'

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/prototype/">
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                ZBT App
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <IndexLinkContainer to="/">
                  <NavItem eventKey={1}>Home</NavItem>
                </IndexLinkContainer>
                <NavDropdown eventKey={2} title="Midnights" id="midnightsDropdown">
                  <LinkContainer to="/midnights/week">
                    <MenuItem eventKey={2.1}>Midnight Assignments</MenuItem>
                  </LinkContainer>
                  <LinkContainer to="/midnights/points">
                    <MenuItem eventKey={2.2}>Midnight Points</MenuItem>
                  </LinkContainer>
                  <LinkContainer to="/midnights/user">
                    <MenuItem eventKey={2.3}>My Midnights</MenuItem>
                  </LinkContainer>
                  <LinkContainer to="/midnights/admin">
                    <MenuItem eventKey={2.4}>Midnights Admin</MenuItem>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container-fluid">
            <Route exact path="/" component={Home}/>
            <Route path="/midnights/user" component={MidnightsUser}/>
            <Route path="/midnights/week" component={MidnightsWeek}/>
            <Route path="/midnights/points" component={MidnightsPoints}/>
            <Route exact path="/midnights/admin/" component={MidnightsAdminDashboard}/>
            <Route path="/midnights/admin/accounts" component={MidnightsAdminAccounts}/>
            <Route path="/midnights/admin/new_midnight" component={MidnightsAdminCreateOne}/>
            <Route path="/midnights/admin/review" component={MidnightsAdminReview}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
