import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { AuthorizationPanel, LoadingPanel, CheckboxForm, ErrorPanel } from 'components';
import { url } from 'urls';
import { Redirect } from 'react-router-dom';

class AdminAccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      authorized: false,
      checked: {},
      possible: [],
      redirect: false,
      error: false,
    }
    this.getData = this.getData.bind(this);
    this.handleCheckboxToggle = this.handleCheckboxToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch(url+"midnights/creatable_accounts").then(response=>response.json()).then(
      (response) => {
        if (response['authorized']) {
          this.setState({
            'loaded':true,
            'authorized':true,
            'possible':response['possible'],
            'checked':response['possible'].reduce(function(acc,curr){
              acc[curr]=false;
              return acc
            }, {})
          })
        } else {
          this.setState({
            'loaded':true,
          })
        }
      }
    ).catch((err)=>{this.setState({'error':true})})
  }

  handleCheckboxToggle(event) {
    let newState = this.state.checked
    newState[event.target.value] = !this.state.checked[event.target.value]
    this.setState({
      checked: newState,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let accounts = Object.keys(this.state.checked).filter((key)=>this.state.checked[key])
    this.setState({
      'loaded':false
    })
    fetch(url+"midnights/create_accounts", {
      method:"POST",
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        accounts: accounts,
      })
    }).then(this.setState({redirect:true})).catch((err)=>{this.setState({'error':true})})
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorPanel />
      )
    }
    if (this.state.loaded) {
      return (
        <AuthorizationPanel authorized={this.state.authorized}
          authorized_component={
            <Panel header={<h3>Create Midnights Accounts</h3>}>
              { this.state.possible.length > 0 ? <CheckboxForm handleCheckboxToggle={this.handleCheckboxToggle}
                handleSubmit={this.handleSubmit} entries={this.state.possible}/>  : <p>No creatable accounts right now.</p>}
            </Panel>
          }/>
      )
    } else if (this.state.redirect) {
      return <Redirect to={{pathname:'/midnights/admin'}}/>
    } else {
      return <LoadingPanel refresh={this.getData}/>
    }
  }
}

export { AdminAccountList }
