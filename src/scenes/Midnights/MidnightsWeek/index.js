import React, { Component } from 'react';
import { MidnightsList, LoadingPanel, ErrorPanel } from 'components';
import { url } from 'urls';
import { Panel, Button } from 'react-bootstrap';

class MidnightsWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'midnights':[],
      'recent':[],
      'types':[],
      'header':[],
      'loaded':false,
      'error':false,
    };
    this.getData = this.getData.bind(this);
    this.getDayOfWeek = this.getDayOfWeek.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
  }

  componentWillMount() {
    this.getData();
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
        this.setState({
          'recent': response.midnights.filter((midnight)=>{
              let today = new Date();
              let date = new Date(Date.parse(midnight.date));
              date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
              let diff = Math.floor((today - date)/(1000*60*60));
              return (diff > 8) && (diff < 32)
            }).sort(this.sortByDate),
          'midnights':response.midnights.sort(this.sortByDate).map(this.formatDate),
          'types': ['date', 'task', 'zebe', 'potential', 'note'],
          'header': ['Date', 'Task', 'Assigned', 'Points', 'Note'],
          'loaded': true,
        });
      }
    }).catch((err)=>{console.log(err);this.setState({'error':true})});
  }

  sortByDate(a, b) {
    let date1 = new Date(Date.parse(a.date));
    let date2 = new Date(Date.parse(b.date));
    return date1 - date2
  }

  formatDate(midnight) {
    let date = new Date(Date.parse(midnight.date));
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    midnight.date = this.getDayOfWeek(date.getDay()) + ' (' + (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear() + ')';
    return midnight
  }

  getUrl() {
    let today = new Date();
    return url + "midnights/weeklist/" + today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate()
  }

  render() {
    if (this.state.error) {
      return <ErrorPanel/>
    }
    if (this.state.loaded) {
      return (
        <div className="container-fluid">
          <Panel header={<h2>Midnight Assignments</h2>}>
            { this.state.midnights.length > 0 ?
              <MidnightsList midnights={this.state.midnights}
                types={this.state.types}
                header={this.state.header}/> : <p> No midnights this week! </p>
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

export { MidnightsWeek }
