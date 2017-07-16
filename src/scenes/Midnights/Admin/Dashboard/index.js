import React, { Component } from 'react';
import { url } from 'urls';
import { Panel } from 'react-bootstrap';
import { LoadingPanel, AuthorizationPanel, ErrorPanel } from 'components';
import { LinkContainer } from 'react-router-bootstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'loaded': false,
      'authorized': false,
      'error': false,
    }
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData()
  }

  getData() {
    fetch(url+'midnights/authorized').then((response)=>response.json()).then(
      (response) => {
        if (response) {
          if (response.authorized) {
            this.setState({
              'loaded':true,
              'authorized':true,
            })
          } else {
            this.setState({
              'loaded':true,
            })
          }
        }
      }
    ).catch((err)=>{this.setState({'error':true})})
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorPanel />
      )
    }
    if (!this.state.loaded) {
      return (
        <LoadingPanel refresh={this.getData}/>
      )
    } else {
      return (
        <AuthorizationPanel authorized={this.state.authorized}
          authorized_component={
            <div className="container-fluid">
              <Panel>
                <h3> Hello, Midnight Maker. </h3>
                <p>I hope things are running smoothly.</p>
                <hr/>
                <ul>
                  <LinkContainer to='/midnights/admin/accounts'><a><li>Set up midnights accounts</li></a></LinkContainer>
                  <LinkContainer to='/midnights/admin/new_midnight'><a><li>Assign a new midnight</li></a></LinkContainer>
                  <LinkContainer to='/midnights/admin/review'><a><li>Review completed midnights</li></a></LinkContainer>
                  <LinkContainer to='/midnights/admin/create_task'><a><li>Create a new type of midnight</li></a></LinkContainer>
                  <LinkContainer to='/midnights/admin/tasks'><a><li>Edit the midnight defaults</li></a></LinkContainer>
                </ul>
              </Panel>
            </div>
          }/>
      )
    }
  }
}

export { Dashboard }
