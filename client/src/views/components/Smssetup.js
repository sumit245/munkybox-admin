import React, { Component } from 'react'
import Cron from 'react-cron-generator'
import 'react-cron-generator/dist/cron-builder.css'


export default class Smssetup extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }

  render() {
    return (<div className="contact-content p-3 ml-n5">
    <div style={{width:500}} >
      <Cron
        onChange={(e)=> {this.setState({value:e});}}
        value={this.state.value}
        showResultText={true}
        showResultCron={true}
        />
    </div>
                            
    </div>)
  }
}
