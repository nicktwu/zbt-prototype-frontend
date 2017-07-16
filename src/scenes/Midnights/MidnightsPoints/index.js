import React, { Component } from 'react';
import { AccountPanel, ErrorPanel } from 'components';
import { url } from 'urls';

class MidnightsPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'accounts':[],
      'error':false,
    }
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData()
  }

  getData() {
    fetch(url+"midnights/accounts").then((response)=>response.json()).then(
      (response) => {
        if (response['accounts']){
          this.setState({
            accounts:response.accounts
          })
        }
      }
    ).catch((err)=>{this.setState({error:true})})
  }

  render() {
    if (this.state.error) {
      return <ErrorPanel/>
    }
    return (
      <div>
        { this.state.accounts.map((account) => {
          return (
            <AccountPanel key={account.id} title="Points"
              zebe={account['zebe']}
              balance={account['balance'].toFixed(2)}/>
            )
          }
        )}
      </div>
    )
  }
}
export { MidnightsPoints }
