import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class AuthorizationPanel extends Component {
  render() {
    if (this.props.children) {

    }

    if (this.props.authorized && this.props.authorized_component) {
      return this.props.authorized_component
    } else if (this.props.authorized) {
      return (
          <div>{this.props.children}</div>
      )
    }else {
      return (
        <Panel>
          <h3>You are not authorized to view this page</h3>
          <p>You can talk to the ZBT president if you think this is a mistake.</p>
        </Panel>
      )
    }
  }
}

export { AuthorizationPanel };
