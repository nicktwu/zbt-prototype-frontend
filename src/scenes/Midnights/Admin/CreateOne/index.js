import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, ControlLabel, Button, Col, HelpBlock } from 'react-bootstrap';
import { AuthorizationPanel, LoadingPanel, ErrorPanel } from 'components';
import { url } from 'urls';
import { Redirect } from 'react-router-dom';

class CreateOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'loaded': false,
      'error': false,
      'authorized': false,
      'year':0,
      'month':0,
      'day':0,
      'dateError':'',
      'zebes':[],
      'zebe':'',
      'zebeError':'',
      'tasks':[],
      'task':'',
      'taskError':'',
      'note':'',
      'potential':'',
      'pointError':'',
      'redirect':false,
    }
    this.getInputHandler = this.getInputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.validDate = this.validDate.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleTaskSelection = this.handleTaskSelection.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch(url+"midnights/options").then(response=>response.json()).catch((err)=>{this.setState({'error':true})}).then(
      (response) => {
        console.log(response.zebes);
        if (response['authorized']) {
          this.setState({
            'loaded': true,
            'authorized': true,
            'zebes': response.zebes,
            'tasks': response.defaults,
          });
        } else {
          this.setState({
            'loaded':true,
          })
        }
      }
    )
  }

  getInputHandler(target) {
    return (event) => {
      let newState = {};
      newState[target] = event.target.value;
      this.setState(newState);
    }
  }

  handleTaskSelection(event) {
    for (let i=0; i < this.state.tasks.length; i++) {
      let task = this.state.tasks[i]
      if (task.name === event.target.value) {
        this.setState({
          'task': task.name,
          'potential': task.value.toString(),
        })
        return
      }
    }
    this.setState({
      'task':event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let body = {};
    let error = false;
    let errors = {}
    let date = new Date(parseInt(this.state.year,10), parseInt(this.state.month,10)-1, parseInt(this.state.day,10))
    if (!this.validDate(date, this.state.year, this.state.month, this.state.day)) {
      errors['dateError']='Not a valid date.'
    } else {
      errors['dateError']=''
    }
    body['date'] = date
    if (!this.state.zebe) {
      errors['zebeError']='No valid zebe selected';
      error = true;
    } else {
      errors['zebeError']='';
    }
    body['zebe'] = this.state.zebe
    if (!this.state.task) {
      errors['taskError']='No valid task selected';
      error = true;
    } else {
      errors['taskError']=''
    }
    body['task'] = this.state.task
    body['note'] = this.state.note
    if (!this.state.potential || parseInt(this.state.potential,10) < 1) {
      errors['pointError']='No valid point value assigned';
      error= true;
    } else {
      errors['pointError']=''
    }
    body['potential'] = parseInt(this.state.potential,10)
    if (error) {
      this.setState(errors);
      return;
    } else {
      this.setState(errors);
      fetch(url+"midnights/create", {
        method:"POST",
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(body)
      }).then(response=>response.json()).then(()=>{
        this.setState({'redirect':true})
      }).catch((err)=>{this.setState({'error':true})})
    }
  }

  validDate(date, year, month, day) {
    return (date.getMonth() + 1 === parseInt(month,10) && date.getFullYear() === parseInt(year,10) && date.getDate() === parseInt(day,10))
  }

  isValid(error) {
    if (error) {
      return "error"
    } else {
      return null
    }
  }

  render() {
    if (!this.state.loaded) {
      return <LoadingPanel />
    } else if (this.state.error) {
      return <ErrorPanel />
    } else if (this.state.redirect) {
      return <Redirect to={{pathname:'/midnights/admin'}}/>
    } else {
      return (
        <AuthorizationPanel authorized={this.state.authorized}
          authorized_component={
            <Panel header="Create a midnight">
              <Form horizontal>
                <FormGroup controlId="date" validationState={this.isValid(this.state.dateError)}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Date
                  </Col>
                  <Col sm={3}>
                    <FormControl type="number" onChange={this.getInputHandler("month")} placeholder="Month"/>
                    {' '}
                    <FormControl type="number" onChange={this.getInputHandler('day')} placeholder="Day"/>
                    {' '}
                    <FormControl type="number" onChange={this.getInputHandler('year')} placeholder="Year"/>
                    <HelpBlock>{this.state.dateError}</HelpBlock>
                  </Col>
                </FormGroup>
                <FormGroup controlId="zebe" validationState={this.isValid(this.state.zebeError)}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Zebe
                  </Col>
                  <Col sm={5}>
                    <FormControl componentClass="select" placeholder=" " onChange={this.getInputHandler("zebe")}>
                      <option value=" "></option>
                      { this.state.zebes.map((zebe)=>{
                        return (
                          <option value={zebe.kerberos} key={zebe.kerberos}>{zebe.name}</option>
                        )
                      })}
                    </FormControl>
                    <HelpBlock>{this.state.zebeError}</HelpBlock>
                  </Col>
                </FormGroup>
                <FormGroup controlId="task" validationState={this.isValid(this.state.taskError)}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Task
                  </Col>
                  <Col sm={5}>
                    <FormControl componentClass="select" placeholder=" " onChange={this.handleTaskSelection}>
                      <option value=" "></option>
                      { this.state.tasks.map((task)=>{
                        return (
                          <option value={task.name} key={task.name}>{task.name}</option>
                        )
                      })}
                    </FormControl>
                    <HelpBlock>{this.state.taskError}</HelpBlock>
                  </Col>
                </FormGroup>
                <FormGroup controlId="potential" validationState={this.isValid(this.state.pointError)}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Points:
                  </Col>
                  <Col sm={5}>
                    <FormControl type="number" placeholder="Points" onChange={this.getInputHandler("potential")} value={this.state.potential} />
                    <HelpBlock>{this.state.pointError}</HelpBlock>
                  </Col>
                </FormGroup>
                <FormGroup controlId="note">
                  <Col componentClass={ControlLabel} sm={2}>
                    Additional notes:
                  </Col>
                  <Col sm={5}>
                    <FormControl componentClass="textarea" placeholder="Add a note" onChange={this.getInputHandler("note")} />
                  </Col>
                </FormGroup>
              </Form>
              <Button type="submit" onClick={this.handleSubmit}>Create</Button>
            </Panel>
          }/>
      )
    }
  }
}

export { CreateOne }
