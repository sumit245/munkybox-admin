import React, { Component } from "react";
import AddUserForm from "../components/users/create/AddUserForm";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

export default class AddUserPage extends Component {
  render() {
    return (
      <>
        <TopNav />
        <div className="contact-wrapper">
          <SideNav />
          <AddUserForm title="Add User" btnTitle="Add" />
        </div>
      </>
    );
  }
}
