import React, {Component} from 'react';
import { url } from 'urls';

class Home extends Component {

  componentWillMount() {
    fetch(url+"trading/").then(response=>response.json()).then(response=>{
      console.log(response)
    }).catch(err=>{console.log(err)})
  }

  render() {
    return (
      <p>Developing</p>
    )
  }
}

export { Home }
