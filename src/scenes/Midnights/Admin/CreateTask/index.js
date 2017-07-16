import React, { Component } from 'react';
import {
  Panel, Form, ControlLabel, Col, FormGroup, FormControl, Button, Alert
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { url } from 'urls';

class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      points: 0,
      loading: false,
      redirect: false,
      error:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading:true});
    let body = {
      name:this.state.name,
      description:this.state.description,
      value: parseFloat(this.state.points),
    }
    console.log(body);
    fetch(url+"midnights/create_type", {
      method:"POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body),
    }).then(response=>response.json()).then(response=>{
      console.log(response)
      if (response['error']) {
        this.setState({loading:false, error:response['error']})
      }
      if (response['type']) {
        this.setState({loading:false, redirect:true})
      }

    }).catch((err)=>{
      this.setState({loading:false, error:'Network error'})
      console.log(err);
    })
  }

  handleChange(key) {
    return (event) => {
      let obj = {};
      obj[key] = event.target.value;
      this.setState(obj);
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to="/midnights/admin"/>
    }
    return (
      <Panel header={<h4>Create New Midnight Type</h4>}>
        { this.state.error ? <Alert bsStyle="danger">Error: {this.state.error}</Alert>: null}
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup id="name">
            <Col sm={4} componentClass={ControlLabel}>
              Name:
            </Col>
            <Col sm={4}>
              <FormControl type="text" onChange={this.handleChange("name")} placeholder="Name" value={this.state.name}/>
            </Col>
          </FormGroup>
          <FormGroup id="points">
            <Col sm={4} componentClass={ControlLabel}>
              Points:
            </Col>
            <Col sm={4}>
              <FormControl type="number" onChange={this.handleChange("points")} value={this.state.points}/>
            </Col>
          </FormGroup>
          <FormGroup id="points">
            <Col sm={4} componentClass={ControlLabel}>
              Description:
            </Col>
            <Col sm={4}>
              <FormControl componentClass="textarea" onChange={this.handleChange("description")} value={this.state.description}/>
            </Col>
          </FormGroup>
          <div className="text-center">
            { this.state.loading ? <Button disabled>Creating</Button> :
              <Button type="submit">Create</Button>
            }
          </div>
        </Form>
      </Panel>
    )
  }
}

export { CreateTask }
