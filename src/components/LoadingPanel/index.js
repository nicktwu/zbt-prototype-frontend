import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class LoadingPanel extends Component {
  render() {
    return (
      <Panel>
        <p>Loading...</p>
      </Panel>
    )
  }
}

export { LoadingPanel }
