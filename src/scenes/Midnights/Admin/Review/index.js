import React, { Component } from 'react';
import { url } from 'urls';
import { Panel } from 'react-bootstrap';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewed: {},
    }
  }

  render() {
    return (
      <Panel header="Review completed midnights">
        Form to review midnights goes here.
      </Panel>
    )
  }
}

export { Review }
