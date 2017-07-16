import React, { Component } from 'react';
import { url } from 'urls';
import { Panel, Form, FormGroup, Col, ControlLabel, FormControl, Alert, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class EditTaskView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      names: [],
      descriptions: [],
      points: [],
      loading: false,
      ids: [],
      error: false,
    }
    this.handlePointChange = this.handlePointChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading:true,
    })
    let body = {
      'types': this.state.ids.map((id, index)=>({
        id:id,
        name:this.state.names[index],
        description: this.state.descriptions[index],
        value: parseFloat(this.state.points[index]),
      }))
    };
    console.log(body)

    fetch(url+"midnights/update_types", {
      method:'PUT',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(body)
    }).then(response=>{
    if (response.status===200) {
      this.setState({redirect:true})
    } else {
      this.setState({error:true})
    }})

  }

  handlePointChange(index) {
    return (event)=> {
      console.log(this.state.points)
      let newPoints = this.state.points
      newPoints[index] = event.target.value
      this.setState({
        points:newPoints,
      })
    }
  }

  handleDescriptionChange(index) {
    return (event)=> {
      let newDescriptions = this.state.descriptions
      newDescriptions[index] = event.target.value
      this.setState({
        descriptions:newDescriptions,
      })
    }
  }

  componentWillMount() {
    fetch(url+"midnights/tasks").then(response=>response.json()).then(response=>{
      let tasks = response['tasks']
      if (tasks) {
        this.setState({
          ids: tasks.map(task=>task.id),
          names: tasks.map(task=>task.name),
          descriptions: tasks.map(task=>task.description),
          points: tasks.map(task=>task.value),
        })
      }
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/midnights/admin"/>
    }
    return (
      <Panel header={<h4>Midnight Tasks</h4>}>
        { this.state.error ? <Alert>An error occurred</Alert> : null}
        { this.state.names.length > 0 ?
          <Form horizontal onSubmit={this.handleSubmit}>
            { [...Array(this.state.names.length)].map((x, index)=>{
              return (
                <FormGroup key={index}>
                  <Col sm={2} componentClass={ControlLabel}>
                    {this.state.names[index]}
                  </Col>
                  <Col sm={8}>
                    <FormControl componentClass="textarea" value={this.state.descriptions[index]}
                                 placeholder="Description" onChange={this.handleDescriptionChange(index)}/>
                  </Col>
                  <Col sm={2}>
                    <FormControl type="number" value={this.state.points[index]} onChange={this.handlePointChange(index)}/>
                  </Col>
                </FormGroup>
              )
            }) }
            <div className="text-center">
              {this.state.loading ? <Button disabled>Saving...</Button>
              : <Button type="submit">Save</Button>}
            </div>
          </Form> : <p>No midnight defaults have been created.</p>
        }

      </Panel>
    )
  }
}

export { EditTaskView }
