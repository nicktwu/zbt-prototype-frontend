import React, { Component } from 'react';
import { FormGroup, Checkbox, Button } from 'react-bootstrap';

class CheckboxForm extends Component {
  render() {
    return (
      <form>
        <FormGroup>
          { this.props.entries.map((entry, index)=> {
            return (
              <Checkbox label={entry} key={entry} value={entry} onChange={this.props.handleCheckboxToggle}>{entry}</Checkbox>
            )
          })}
        </FormGroup>
        <Button type='submit' onClick={this.props.handleSubmit}>Add</Button>
      </form>
    )
  }
}

export { CheckboxForm }
