import React, { Component } from 'react';
import { url } from 'urls';
import { Panel, Form, FormGroup, Col, ControlLabel, FormControl, Alert, Button } from 'react-bootstrap';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [],
      points: [],
      pointErrors: [],
      notes: [],
      loading: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePointChange = this.handlePointChange.bind(this)
    this.handleNoteChange = this.handleNoteChange.bind(this)
  }

  handleSubmit(index) {
    return (event)=> {
      event.preventDefault();
      let newLoading = this.state.loading;
      newLoading[index] = true;
      this.setState({
        loading:newLoading,
      })
      let midnights = this.state.review;
      let body = {
        points:parseFloat(this.state.points[index]),
        note:this.state.notes[index],
      };

      fetch(url+"midnights/award/"+midnights[index]['id'].toString(), {
        method:'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(body)
      }).then(response=>{
        if (response.status===200) {
          midnights[index]['saved']=true
          this.setState({
            review:midnights,
          })
        } else {

          midnights[index]['error']=true
          this.setState({
            review:midnights,
          })
        }
      })
    }
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

  handleNoteChange(index) {
    return (event)=> {
      let newNotes = this.state.notes
      newNotes[index] = event.target.value
      this.setState({
        notes:newNotes,
      })
    }
  }

  componentWillMount() {
    fetch(url+"midnights/review").then(response=>response.json()).then(response=>{
      console.log(response)
      let review = (response && response['midnights'] ? response['midnights'] : [])
      this.setState({
        review: review,
        points: review.map((midnight)=>midnight['potential'].toFixed(2).toString()),
        notes: review.map((midnight)=>""),
        loading: review.map((midnight)=>false)
      })
    })
  }

  render() {
    return (
      <Panel header="Review completed midnights">
          { this.state.review.length < 1 ? "No midnights to review!" : null}
          { this.state.review.map((midnight, index) => {
            if (midnight['saved']) {
              return (
                <Alert key={midnight.id} bsStyle="success">Saved</Alert>
              )
            } else if (midnight['error']) {
              return (
                <Alert key={midnight.id} bsStyle="error">Could not save</Alert>
              )
            }
            return (
              <Panel key={midnight.id}>
                <Form horizontal onSubmit={this.handleSubmit(index)}>
                  <FormGroup validationState={this.state.pointErrors[index] ? "error" : null}>
                    <Col sm={4} componentClass={ControlLabel}>
                      {midnight["date"]}: {midnight["task"]} ({midnight["zebe"]})
                    </Col>
                    <Col sm={4}>
                      <FormControl type="number" value={this.state.points[index]} onChange={this.handlePointChange(index)}/>
                    </Col>
                    <Col sm={4}>
                      <FormControl type="text" value={this.state.notes[index]}
                                   placeholder="Note" onChange={this.handleNoteChange(index)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={4} sm={8}>
                      {this.state.loading[index] ? <Button disabled>Saving...</Button>
                      : <Button type="submit">Save</Button>}
                    </Col>
                  </FormGroup>
                </Form>
              </Panel>
            )
          }) }
      </Panel>
    )
  }
}

export { Review }
