import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import { MidnightsEntry } from './MidnightsEntry'

class MidnightsList extends Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            { this.props.header.map(
              (data, index) => {
                return(
                  <th key={data}>{ data }</th>
                )
              }
            ) }
          </tr>
        </thead>
        <tbody>
          {  this.props.midnights.map((midnight, index) => {
            return (
              <MidnightsEntry key={index} midnight={midnight} types={this.props.types}/>
            )
          })}
        </tbody>
      </Table>
    )
  }
}

export { MidnightsList }
