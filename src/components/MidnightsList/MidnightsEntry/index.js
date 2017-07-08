import React, { Component } from 'react';

class MidnightsEntry extends Component {
  render() {
    return (
      <tr>
        { this.props.types.map(
          (type, index) => {
            return (
              <td key={index}>{ this.props.midnight[type] }</td>
            )
          }
        )}
      </tr>
    )
  }
}

export { MidnightsEntry }
