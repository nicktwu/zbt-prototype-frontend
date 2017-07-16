import React, { Component } from 'react';
import { MidnightsList, LoadingPanel, AccountPanel, ErrorPanel } from 'components';
import { url } from 'urls';
import { Panel, Button } from 'react-bootstrap';

class MidnightsUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'midnights':[],
      'recent':[],
      'types':[],
      'header':[],
      'account': null,
      'loaded': false,
      'goal': -1,
      'error': false,
    };
    this.getData = this.getData.bind(this);
    this.getDayOfWeek = this.getDayOfWeek.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.formatPoints = this.formatPoints.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  sortByDate(a, b) {
    let date1 = new Date(Date.parse(a.date));
    let date2 = new Date(Date.parse(b.date));
    return date1 - date2
  }

  getDayOfWeek(day) {
    if (day === 0) {
      return "Sunday"
    } else if (day === 1) {
      return "Monday"
    } else if (day === 2) {
      return "Tuesday"
    } else if (day === 3) {
      return "Wednesday"
    } else if (day === 4) {
      return "Thursday"
    } else if (day === 5) {
      return "Friday"
    } else if (day === 6) {
      return "Saturday"
    }
  }

  getData() {
    fetch(this.getUrl()).then((response) => {
      return response.json()
    }).then((response) => {
      if (response) {
        let acc = null;
        if (response['account']) {
          acc = response['account']
        }

        this.setState({

          'recent': response.midnights.filter((midnight)=>{
              let today = new Date();
              let date = new Date(Date.parse(midnight.date));
              date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
              let diff = Math.floor((today - date)/(1000*60*60));
              return (diff > 8) && (diff < 32)
            }).sort(this.sortByDate),
          'midnights':response.midnights.sort(this.sortByDate).map(this.formatDate).map(this.formatPoints),
          'reviewed':response.reviewed.sort(this.sortByDate).map(this.formatDate).map(this.formatPoints),
          'account': acc,
          'types': ['date', 'task', 'potential', 'note'],
          'header': ['Date', 'Task', 'Points', 'Note'],
          'reviewtypes': ['date', 'task', 'potential', 'awarded', 'feedback'],
          'reviewheader': ['Date', 'Task', 'Potential Points', 'Awarded Points', 'Feedback'],
          'loaded': true,
          'goal': (acc['goal'] ? (acc.goal > 0 ? acc.goal : -1) : -1),
        });
      }
    }).catch((err)=>{this.setState({'error':true})});
  }

  formatDate(midnight) {
    let date = new Date(Date.parse(midnight.date));
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    midnight.date = this.getDayOfWeek(date.getDay()) + ' (' + (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear() + ')';
    return midnight;
  }

  formatPoints(midnight) {
    let newPoints = midnight.potential.toFixed(2);
    let newAwarded = midnight.awarded.toFixed(2);
    midnight.potential = newPoints;
    midnight.awarded = newAwarded;
    return midnight
  }

  getUrl() {
    let today = new Date();
    return url + "midnights/user/weeklist/" + today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate()
  }

  render() {
    if (this.state.error) {
      return <ErrorPanel/>
    }
    if (this.state.loaded) {
      return (
        <div className="container-fluid">
          { this.state.account ?
            <AccountPanel zebe={this.state.account['zebe']}
              title = "Midnight Points"
              balance={this.state.account['balance'].toFixed(2) }
              semester={this.state.account['semester']}
              goal={ this.state.goal > -1 ? this.state.goal : 0 }/>
            : null
          }
          <Panel header={<h2>Midnights Tonight</h2>}>
            { this.state.recent.length > 0 ?
              <MidnightsList midnights={this.state.recent}
                types={ this.state.types }
                header={ this.state.header }/> : <p> No midnights today! </p>
            }
          </Panel>
          <Panel header={<h2>Recently Reviewed</h2>}>
            { this.state.reviewed.length > 0 ?
              <MidnightsList midnights={this.state.reviewed}
                types={this.state.reviewtypes}
                header={this.state.reviewheader}/> : <p> No recently reviewed midnights.</p>
            }
          </Panel>
          <Panel header={<h2>My Midnights This Week</h2>}>
            { this.state.midnights.length > 0 ?
              <MidnightsList midnights={this.state.midnights}
                types={this.state.types}
                header={this.state.header}/> : <p> No midnights this week!</p>
            }
          </Panel>
          <Button onClick={this.getData}>Refresh</Button>
        </div>
      )
    } else {
      return (
        <LoadingPanel refresh={this.getData}/>
      )
    }

  }
}

export { MidnightsUser }
