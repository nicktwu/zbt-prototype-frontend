import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class AccountPanel extends Component {
  render() {
    return (
      <Panel header={<h3>{this.props.title} - {this.props.zebe}</h3>}>
        {this.props.semester ? <p> Current semester: {this.props.semester} </p> : null}
        <p> Current points: {this.props.balance} </p>
        { this.props.goal ?
          <p> Current requirement: {this.props.goal} </p> : null
        }
      </Panel>
    )
  }
}

export { AccountPanel }
