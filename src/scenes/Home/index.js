import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'

class Home extends Component {
  render() {
    return (
      <Jumbotron>
        <h2>Hello.</h2>
        <p>I'm here to make your life easier.</p>
      </Jumbotron>
    )
  }
}

export { Home }
