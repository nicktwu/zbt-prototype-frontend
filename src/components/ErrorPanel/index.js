import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class ErrorPanel extends Component {
  render() {
    return (
      <Panel header="Oops!">
        <p>Something went wrong! Please tell Nick exactly what you did, and he'll try to fix this as soon as possible.</p>
      </Panel>
    )
  }
}

export { ErrorPanel }
