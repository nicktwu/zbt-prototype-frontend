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
  MidnightsAdminCreateOne, MidnightsAdminReview, MidnightsAdminTasks,
  MidnightsAdminCreateTask, MarketHome, WorkweekHome, WorkweekTickets, WorkweekAdmin
} from './scenes'

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/prototype/">
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                ZBTodo
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <IndexLinkContainer to="/">
                  <NavItem eventKey={1}>Home</NavItem>
                </IndexLinkContainer>
                <LinkContainer to="/market">
                  <NavItem eventKey={3}>Market</NavItem>
                </LinkContainer>
                <NavDropdown eventKey={4} title="Workweek" id="workweekDropdown">
                  <IndexLinkContainer to="/workweek">
                    <NavItem eventKey={4.1}>Workweek Home</NavItem>
                  </IndexLinkContainer>
                  <LinkContainer to="/workweek/software">
                    <MenuItem eventKey={4.1}>Software Development</MenuItem>
                  </LinkContainer>
                  <LinkContainer to="/workweek/admin">
                    <MenuItem eventKey={4.2}>Workweek Chair</MenuItem>
                  </LinkContainer>
                </NavDropdown>
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
            <Route path="/midnights/admin/tasks" component={MidnightsAdminTasks}/>
            <Route path="/midnights/admin/create_task" component={MidnightsAdminCreateTask}/>
            <Route exact path="/market/" component={MarketHome}/>
            <Route exact path="/workweek" component={ WorkweekHome }/>
            <Route path="/workweek/software" component={ WorkweekTickets }/>
            <Route path="/workweek/admin" component={ WorkweekAdmin }/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
