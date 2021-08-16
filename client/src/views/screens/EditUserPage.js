import axios from 'axios';
import React, { Component } from 'react'
import AddUserForm from "../components/users/create/AddUserForm";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

export default class EditUserPage extends Component {
  state = {
    userdata: [],
    isupdate:false
  }

  componentDidMount() {
    let url = window.location.href;
    const idofclient = url.split('id=')[1];
    axios.get('/api/users/' + idofclient).then(res => {
      this.setState({ userdata: res.data,isupdate:true })
    }).catch(err => console.error(err))

  }

  render() {
    const isupdate=this.state.isupdate
    return (
      <>
        <TopNav />
        <div className="contact-wrapper">
          <SideNav />
          {isupdate?<AddUserForm data={this.state.userdata} title="Edit User" btnTitle="Save" isLoaded={true} />:<div className="progressbar"/> }
          
        </div>
      </>
    )
  }
}
